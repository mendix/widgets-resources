import { WebIcon, ObjectItem } from "mendix";
import {
    createElement,
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    ReactEventHandler,
    ReactNode,
    SyntheticEvent,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import classNames from "classnames";
import { Icon } from "@mendix/piw-utils-internal";
import { ShowIconEnum, TreeViewContainerProps } from "../../typings/TreeViewProps";
import {
    TreeViewBranchContextProps,
    TreeViewBranchContext,
    useInformParentContextToHaveChildNodes
} from "./TreeViewBranchContext";

import "../ui/TreeView.scss";
import loadingCircleSvg from "../assets/loading-circle.svg";
import {
    TreeViewFocusChangeHandler,
    useTreeViewBranchKeyboardHandler,
    useTreeViewFocusChangeHandler
} from "./hooks/treeViewAccessibility";
import { ChevronIcon } from "./ChevronIcon";

export interface TreeViewObject extends ObjectItem {
    value: string | ReactNode | undefined;
    content: ReactNode;
}

export interface TreeViewProps extends Pick<TreeViewContainerProps, "tabIndex"> {
    name?: string;
    class: string;
    style?: CSSProperties;
    items: TreeViewObject[] | null;
    isUserDefinedLeafNode: TreeViewBranchProps["isUserDefinedLeafNode"];
    shouldLazyLoad: TreeViewBranchProps["shouldLazyLoad"];
    startExpanded: TreeViewBranchProps["startExpanded"];
    showCustomIcon: boolean;
    iconPlacement: TreeViewBranchProps["iconPlacement"];
    expandIcon: WebIcon | null;
    collapseIcon: WebIcon | null;
}

export function TreeView({
    class: className,
    items,
    style,
    isUserDefinedLeafNode,
    showCustomIcon,
    shouldLazyLoad,
    startExpanded,
    iconPlacement,
    expandIcon,
    collapseIcon,
    tabIndex
}: TreeViewProps): ReactElement | null {
    const { informParentIsLoading, level } = useContext(TreeViewBranchContext);

    const renderHeaderIcon = useCallback<TreeViewBranchProps["renderHeaderIcon"]>(
        (treeViewState, iconPlacement) => {
            if (treeViewState === TreeViewState.LOADING) {
                return <img src={loadingCircleSvg} className="widget-tree-view-loading-spinner" alt="" aria-hidden />;
            }
            const treeViewIsExpanded = treeViewState === TreeViewState.EXPANDED;
            return showCustomIcon ? (
                <Icon
                    icon={treeViewIsExpanded ? collapseIcon : expandIcon}
                    className="widget-tree-view-branch-header-icon"
                />
            ) : (
                <ChevronIcon
                    className={classNames("widget-tree-view-branch-header-icon", {
                        "widget-tree-view-branch-header-icon-collapsed-left":
                            !treeViewIsExpanded && iconPlacement === "left",
                        "widget-tree-view-branch-header-icon-collapsed-right":
                            !treeViewIsExpanded && iconPlacement === "right"
                    })}
                />
            );
        },
        [collapseIcon, expandIcon, showCustomIcon]
    );

    // Combination of useState + useCallback is necessary here over useRef because it needs to trigger an update in useInformParentContextToHaveChildNodes
    const [treeViewElement, setTreeViewElement] = useState<HTMLDivElement | null>(null);
    const updateTreeViewElement = useCallback(node => {
        if (node) {
            setTreeViewElement(node);
        }
    }, []);

    const isInsideAnotherTreeView = useCallback(() => {
        return treeViewElement?.parentElement?.className.includes(treeViewBranchUtils.bodyClassName) ?? false;
    }, [treeViewElement]);

    useEffect(() => {
        informParentIsLoading(!items);
    }, [items, informParentIsLoading]);

    useInformParentContextToHaveChildNodes(items, isInsideAnotherTreeView);

    const changeTreeViewBranchHeaderFocus = useTreeViewFocusChangeHandler();

    if (!items) {
        return null;
    }

    return (
        <ul
            className={classNames("widget-tree-view", className)}
            style={style}
            ref={updateTreeViewElement}
            data-focusindex={tabIndex || 0}
            role={level === 0 ? "tree" : "group"}
        >
            {items.map(({ id, value, content }) => (
                <TreeViewBranch
                    key={id}
                    id={id}
                    value={value}
                    isUserDefinedLeafNode={isUserDefinedLeafNode}
                    shouldLazyLoad={shouldLazyLoad}
                    startExpanded={startExpanded}
                    iconPlacement={iconPlacement}
                    renderHeaderIcon={renderHeaderIcon}
                    changeFocus={changeTreeViewBranchHeaderFocus}
                >
                    {content}
                </TreeViewBranch>
            ))}
        </ul>
    );
}
interface TreeViewBranchProps {
    id: TreeViewObject["id"];
    isUserDefinedLeafNode: boolean;
    shouldLazyLoad: boolean;
    startExpanded: boolean;
    value: TreeViewObject["value"];
    children: TreeViewObject["content"];
    iconPlacement: ShowIconEnum;
    renderHeaderIcon: (treeViewState: TreeViewState, iconPlacement: Exclude<ShowIconEnum, "no">) => ReactNode;
    changeFocus: TreeViewFocusChangeHandler;
}

const treeViewBranchUtils = {
    bodyClassName: "widget-tree-view-body",
    getHeaderId: (id: TreeViewObject["id"]) => `${id}TreeViewBranchHeader`,
    getBodyId: (id: TreeViewObject["id"]) => `${id}TreeViewBranchBody`
};

function getTreeViewAccessibilityProps(isExpanded: boolean): HTMLAttributes<HTMLLIElement> {
    return {
        "aria-expanded": isExpanded,
        role: "treeitem",
        tabIndex: 0
    };
}

export const enum TreeViewState {
    COLLAPSED_WITH_JS = "COLLAPSED_WITH_JS",
    COLLAPSED_WITH_CSS = "COLLAPSED_WITH_CSS",
    EXPANDED = "EXPANDED",
    LOADING = "LOADING"
}

function TreeViewBranch(props: TreeViewBranchProps): ReactElement {
    const { level: currentContextLevel } = useContext(TreeViewBranchContext);
    const [treeViewState, setTreeViewState] = useState<TreeViewState>(
        !props.shouldLazyLoad && props.startExpanded ? TreeViewState.EXPANDED : TreeViewState.COLLAPSED_WITH_JS
    );
    const [isActualLeafNode, setIsActualLeafNode] = useState<boolean>(props.isUserDefinedLeafNode || !props.children);

    const updateTreeViewState = useCallback<TreeViewBranchContextProps["informParentIsLoading"]>(isLoading => {
        if (!isLoading) {
            setTreeViewState(treeViewState =>
                treeViewState === TreeViewState.LOADING ? TreeViewState.EXPANDED : treeViewState
            );
        }
    }, []);

    const treeViewBranchRef = useRef<HTMLLIElement>(null);
    const { changeFocus } = props;

    const eventTargetIsNotCurrentBranch = useCallback<(event: SyntheticEvent<HTMLElement>) => boolean>(event => {
        const target = event.target as Node;
        return (
            !treeViewBranchRef.current?.isSameNode(target) &&
            !treeViewBranchRef.current?.firstElementChild?.contains(target) &&
            !treeViewBranchRef.current?.lastElementChild?.isSameNode(target)
        );
    }, []);

    const toggleTreeViewContent = useCallback<ReactEventHandler<HTMLLIElement>>(
        event => {
            if (eventTargetIsNotCurrentBranch(event)) {
                return;
            }
            if (!isActualLeafNode) {
                setTreeViewState(treeViewState => {
                    if (treeViewState === TreeViewState.LOADING) {
                        // TODO:
                        return treeViewState;
                    }
                    if (treeViewState === TreeViewState.COLLAPSED_WITH_JS) {
                        return props.shouldLazyLoad ? TreeViewState.LOADING : TreeViewState.EXPANDED;
                    }
                    if (treeViewState === TreeViewState.COLLAPSED_WITH_CSS) {
                        return TreeViewState.EXPANDED;
                    }
                    return props.shouldLazyLoad ? TreeViewState.COLLAPSED_WITH_CSS : TreeViewState.COLLAPSED_WITH_JS;
                });
            }
        },
        [isActualLeafNode, props.shouldLazyLoad, eventTargetIsNotCurrentBranch]
    );

    const treeViewAccessibilityProps = getTreeViewAccessibilityProps(treeViewState === TreeViewState.EXPANDED);

    const informParentToHaveChildNodes = useCallback<TreeViewBranchContextProps["informParentToHaveChildNodes"]>(
        hasChildNodes => {
            if (!hasChildNodes && !isActualLeafNode) {
                setIsActualLeafNode(true);
            } else if (hasChildNodes && isActualLeafNode) {
                setIsActualLeafNode(false);
            }
        },
        [isActualLeafNode]
    );

    const onHeaderKeyDown = useTreeViewBranchKeyboardHandler(
        toggleTreeViewContent,
        changeFocus,
        treeViewState,
        isActualLeafNode,
        eventTargetIsNotCurrentBranch
    );

    const onTreeViewClick = useCallback<ReactEventHandler<HTMLLIElement>>(
        event => {
            if (eventTargetIsNotCurrentBranch(event)) {
                return;
            }
            toggleTreeViewContent(event);
        },
        [toggleTreeViewContent, eventTargetIsNotCurrentBranch]
    );

    return (
        <li
            className="widget-tree-view-branch"
            onClick={onTreeViewClick}
            onKeyDown={onHeaderKeyDown}
            ref={treeViewBranchRef}
            {...treeViewAccessibilityProps}
        >
            <span
                className={classNames("widget-tree-view-branch-header", {
                    "widget-tree-view-branch-header-clickable": !isActualLeafNode,
                    "widget-tree-view-branch-header-reversed": props.iconPlacement === "left"
                })}
                id={treeViewBranchUtils.getHeaderId(props.id)}
            >
                <span className="widget-tree-view-branch-header-value">{props.value}</span>
                {!isActualLeafNode &&
                    props.iconPlacement !== "no" &&
                    props.renderHeaderIcon(treeViewState, props.iconPlacement)}
            </span>
            {!isActualLeafNode && treeViewState !== TreeViewState.COLLAPSED_WITH_JS && (
                <TreeViewBranchContext.Provider
                    value={{
                        level: currentContextLevel + 1,
                        informParentToHaveChildNodes,
                        informParentIsLoading: updateTreeViewState,
                        childShouldShowPlaceholder: props.shouldLazyLoad
                    }}
                >
                    <div
                        className={classNames(treeViewBranchUtils.bodyClassName, {
                            "widget-tree-view-branch-hidden": treeViewState === TreeViewState.COLLAPSED_WITH_CSS
                        })}
                        id={treeViewBranchUtils.getBodyId(props.id)}
                        aria-hidden={treeViewState === TreeViewState.COLLAPSED_WITH_CSS}
                    >
                        {props.children}
                    </div>
                </TreeViewBranchContext.Provider>
            )}
        </li>
    );
}
