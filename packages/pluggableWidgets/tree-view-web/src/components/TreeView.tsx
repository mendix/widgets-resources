import { WebIcon, ObjectItem } from "mendix";
import {
    createElement,
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    ReactNode,
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
        treeViewState => {
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
                // TODO: This should not be a glyphicon, but rather a svg or something that is not dependent on Atlas
                <span
                    className={classNames(
                        "glyphicon",
                        treeViewIsExpanded ? "glyphicon-minus" : "glyphicon-plus",
                        "widget-tree-view-branch-header-icon"
                    )}
                    aria-hidden
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
    renderHeaderIcon: (treeViewState: TreeViewState) => ReactNode;
    changeFocus: TreeViewFocusChangeHandler;
}

const treeViewBranchUtils = {
    bodyClassName: "widget-tree-view-body",
    getHeaderId: (id: TreeViewObject["id"]) => `${id}TreeViewBranchHeader`,
    getBodyId: (id: TreeViewObject["id"]) => `${id}TreeViewBranchBody`
};

function getTreeViewHeaderAccessibilityProps(
    isActualLeafNode: boolean,
    id: TreeViewObject["id"]
): HTMLAttributes<HTMLHeadElement> {
    const commonProps: HTMLAttributes<HTMLHeadElement> = {
        id: treeViewBranchUtils.getHeaderId(id),
        "aria-controls": treeViewBranchUtils.getBodyId(id),
        tabIndex: 0
    };
    if (isActualLeafNode) {
        return commonProps;
    }
    return {
        ...commonProps,
        role: "button"
    };
}

function getTreeViewAccessibilityProps(isActualLeafNode: boolean, isExpanded: boolean): HTMLAttributes<HTMLLIElement> {
    return {
        role: isActualLeafNode ? "none" : "treeitem",
        "aria-expanded": isExpanded
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

    const headerRef = useRef<HTMLElement>(null);
    const { changeFocus } = props;

    const toggleTreeViewContent = useCallback(() => {
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
    }, [isActualLeafNode, props.shouldLazyLoad]);

    const headerAccessibilityProps = getTreeViewHeaderAccessibilityProps(isActualLeafNode, props.id);
    const treeViewAccessibilityProps = getTreeViewAccessibilityProps(
        isActualLeafNode,
        treeViewState === TreeViewState.EXPANDED
    );

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
        isActualLeafNode
    );

    return (
        <li className="widget-tree-view-branch" {...treeViewAccessibilityProps}>
            <header
                className={classNames("widget-tree-view-branch-header", {
                    "widget-tree-view-branch-header-clickable": !isActualLeafNode,
                    "widget-tree-view-branch-header-reversed": props.iconPlacement === "left"
                })}
                onClick={toggleTreeViewContent}
                onKeyDown={onHeaderKeyDown}
                ref={headerRef}
                data-focusindex={0}
                {...headerAccessibilityProps}
            >
                <span className="widget-tree-view-branch-header-value">{props.value}</span>
                {!isActualLeafNode && props.iconPlacement !== "no" && props.renderHeaderIcon(treeViewState)}
            </header>
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
                        aria-labelledby={treeViewBranchUtils.getHeaderId(props.id)}
                        data-focusindex={0}
                    >
                        {props.children}
                    </div>
                </TreeViewBranchContext.Provider>
            )}
        </li>
    );
}
