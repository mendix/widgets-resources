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
    useLayoutEffect,
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
import { useTreeViewLazyLoading } from "./hooks/lazyLoading";
import { useAnimatedTreeViewContentHeight } from "./hooks/useAnimatedHeight";

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
    startExpanded: TreeViewBranchProps["startExpanded"];
    showCustomIcon: boolean;
    iconPlacement: TreeViewBranchProps["iconPlacement"];
    expandIcon: WebIcon | null;
    collapseIcon: WebIcon | null;
    animateIcon: boolean;
    animateTreeViewContent: TreeViewBranchProps["animateTreeViewContent"];
}

export function TreeView({
    class: className,
    items,
    style,
    isUserDefinedLeafNode,
    showCustomIcon,
    startExpanded,
    iconPlacement,
    expandIcon,
    collapseIcon,
    tabIndex,
    animateIcon,
    animateTreeViewContent
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
                        "widget-tree-view-branch-header-icon-animated": animateIcon,
                        "widget-tree-view-branch-header-icon-collapsed-left":
                            !treeViewIsExpanded && iconPlacement === "left",
                        "widget-tree-view-branch-header-icon-collapsed-right":
                            !treeViewIsExpanded && iconPlacement === "right"
                    })}
                />
            );
        },
        [collapseIcon, expandIcon, showCustomIcon, animateIcon]
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
                    startExpanded={startExpanded}
                    iconPlacement={iconPlacement}
                    renderHeaderIcon={renderHeaderIcon}
                    changeFocus={changeTreeViewBranchHeaderFocus}
                    animateTreeViewContent={animateTreeViewContent}
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
    startExpanded: boolean;
    value: TreeViewObject["value"];
    children: TreeViewObject["content"];
    iconPlacement: ShowIconEnum;
    renderHeaderIcon: (treeViewState: TreeViewState, iconPlacement: Exclude<ShowIconEnum, "no">) => ReactNode;
    changeFocus: TreeViewFocusChangeHandler;
    animateTreeViewContent: boolean;
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
        props.startExpanded ? TreeViewState.EXPANDED : TreeViewState.COLLAPSED_WITH_JS
    );
    const [isActualLeafNode, setIsActualLeafNode] = useState<boolean>(props.isUserDefinedLeafNode || !props.children);

    const updateTreeViewState = useCallback<TreeViewBranchContextProps["informParentIsLoading"]>(isLoading => {
        if (!isLoading) {
            setTreeViewState(treeViewState =>
                treeViewState === TreeViewState.LOADING ? TreeViewState.EXPANDED : treeViewState
            );
        }
    }, []);

    const treeViewBranchBody = useRef<HTMLDivElement>(null);
    const treeViewBranchRef = useRef<HTMLLIElement>(null);

    const { hasNestedTreeView } = useTreeViewLazyLoading(treeViewBranchBody);
    const {
        isAnimating,
        captureElementHeight,
        animateTreeViewContent,
        cleanupAnimation
    } = useAnimatedTreeViewContentHeight(treeViewBranchBody);

    useLayoutEffect(() => {
        if (props.animateTreeViewContent && treeViewState !== TreeViewState.LOADING) {
            const animationCleanup = animateTreeViewContent();
            if (animationCleanup) {
                return animationCleanup;
            }
        }
    }, [animateTreeViewContent, props.animateTreeViewContent, treeViewState]);

    const eventTargetIsNotCurrentBranch = useCallback<(event: SyntheticEvent<HTMLElement>) => boolean>(event => {
        const target = event.target as Node;
        return (
            !treeViewBranchRef.current?.isSameNode(target) &&
            !treeViewBranchRef.current?.firstElementChild?.contains(target) &&
            !treeViewBranchRef.current?.lastElementChild?.isSameNode(target)
        );
    }, []);

    useEffect(() => {
        if (treeViewState === TreeViewState.LOADING) {
            if (!hasNestedTreeView()) {
                setTreeViewState(TreeViewState.EXPANDED);
            }
        }
    }, [hasNestedTreeView, treeViewState]);

    const toggleTreeViewContent = useCallback<ReactEventHandler<HTMLLIElement>>(
        event => {
            if (eventTargetIsNotCurrentBranch(event)) {
                return;
            }
            if (!isActualLeafNode) {
                captureElementHeight();
                setTreeViewState(treeViewState => {
                    if (treeViewState === TreeViewState.LOADING) {
                        // TODO:
                        return treeViewState;
                    }
                    if (treeViewState === TreeViewState.COLLAPSED_WITH_JS) {
                        return TreeViewState.LOADING;
                    }
                    if (treeViewState === TreeViewState.COLLAPSED_WITH_CSS) {
                        return TreeViewState.EXPANDED;
                    }
                    return TreeViewState.COLLAPSED_WITH_CSS;
                });
            }
        },
        [isActualLeafNode, eventTargetIsNotCurrentBranch, captureElementHeight]
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
        props.changeFocus,
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
            {((!isActualLeafNode && treeViewState !== TreeViewState.COLLAPSED_WITH_JS) || isAnimating) && (
                <TreeViewBranchContext.Provider
                    value={{
                        level: currentContextLevel + 1,
                        informParentToHaveChildNodes,
                        informParentIsLoading: updateTreeViewState
                    }}
                >
                    <div
                        className={classNames(treeViewBranchUtils.bodyClassName, {
                            "widget-tree-view-branch-hidden":
                                treeViewState === TreeViewState.COLLAPSED_WITH_CSS && !isAnimating
                        })}
                        id={treeViewBranchUtils.getBodyId(props.id)}
                        aria-hidden={treeViewState !== TreeViewState.EXPANDED}
                        ref={treeViewBranchBody}
                        onTransitionEnd={cleanupAnimation}
                    >
                        {props.children}
                    </div>
                </TreeViewBranchContext.Provider>
            )}
        </li>
    );
}
