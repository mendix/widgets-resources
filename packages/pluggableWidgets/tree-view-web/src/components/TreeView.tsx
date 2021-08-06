import { WebIcon, ObjectItem } from "mendix";
import {
    createElement,
    CSSProperties,
    HTMLAttributes,
    KeyboardEventHandler,
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
import { ShowIconEnum } from "../../typings/TreeViewProps";
import {
    TreeViewBranchContextProps,
    TreeViewBranchContext,
    useInformParentContextToHaveChildNodes
} from "./TreeViewBranchContext";
import { useIncrementalId } from "./hooks/useIncrementalId";

import "../ui/TreeView.scss";
import loadingCircleSvg from "../assets/loading-circle.svg";

export interface TreeViewObject extends ObjectItem {
    value: string | ReactNode | undefined;
    content: ReactNode;
}

export interface TreeViewProps {
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

const enum FocusTargetChange {
    FIRST = "FIRST",
    LAST = "LAST",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT"
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
    collapseIcon
}: TreeViewProps): ReactElement | null {
    const { informParentIsLoading } = useContext(TreeViewBranchContext);
    const { id: currentTreeViewUniqueId } = useIncrementalId();

    const renderHeaderIcon = useCallback<TreeViewBranchProps["renderHeaderIcon"]>(
        treeViewState => {
            if (treeViewState === TreeViewState.LOADING) {
                return (
                    <img src={loadingCircleSvg} className="widget-tree-view-loading-spinner" alt="Loading spinner" />
                );
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

    const changeTreeViewBranchHeaderFocus = useCallback<TreeViewBranchProps["changeFocus"]>(
        (targetElement, focusTargetChange, traverseOption) => {
            if (targetElement && targetElement instanceof Element && treeViewElement) {
                const targetableBranches: HTMLHeadElement[] = Array.from(
                    treeViewElement.querySelectorAll(":scope > .widget-tree-view-branch > header[role=button]")
                );

                const numberOfTargetableBranches = targetableBranches.length;
                if (numberOfTargetableBranches === 0) {
                    return;
                }

                switch (focusTargetChange) {
                    case FocusTargetChange.FIRST:
                        targetableBranches[0].focus();
                        break;
                    case FocusTargetChange.LAST:
                        targetableBranches[numberOfTargetableBranches - 1].focus();
                        break;
                    case FocusTargetChange.PREVIOUS:
                    case FocusTargetChange.NEXT:
                        const currentBranchIndex = targetableBranches.findIndex(targetableBranch =>
                            targetableBranch.isSameNode(targetElement)
                        );
                        if (currentBranchIndex >= 0) {
                            if (focusTargetChange === FocusTargetChange.NEXT) {
                                if (traverseOption === "VERTICAL") {
                                    const childTreeViewHeaders = targetElement.nextElementSibling
                                        ? Array.from(
                                              targetElement.nextElementSibling.querySelectorAll(
                                                  ".widget-tree-view-branch-header[role=button]"
                                              )
                                          )
                                        : [];
                                    if (childTreeViewHeaders.length > 0) {
                                        (childTreeViewHeaders[0] as HTMLHeadElement).focus();
                                    }
                                    return;
                                }
                                const newBranchIndex = currentBranchIndex + 1;
                                const newBranchIndexProcessed = Math.min(
                                    newBranchIndex,
                                    numberOfTargetableBranches - 1
                                );
                                if (newBranchIndexProcessed !== currentBranchIndex) {
                                    targetableBranches[newBranchIndexProcessed].focus();
                                }
                            }
                            if (focusTargetChange === FocusTargetChange.PREVIOUS) {
                                if (currentBranchIndex === 0 && traverseOption === "VERTICAL") {
                                    const parentTreeViewHeaders = Array.from(
                                        document.querySelectorAll(".widget-tree-view-branch-header[role=button]")
                                    ).filter(node => node.nextElementSibling?.contains(targetElement));
                                    if (parentTreeViewHeaders.length > 0) {
                                        (parentTreeViewHeaders[
                                            parentTreeViewHeaders.length - 1
                                        ] as HTMLHeadElement).focus();
                                    }
                                    return;
                                }
                                const newBranchIndex = currentBranchIndex - 1;
                                const newBranchIndexProcessed = Math.max(newBranchIndex, 0);
                                if (newBranchIndexProcessed !== currentBranchIndex) {
                                    targetableBranches[newBranchIndexProcessed].focus();
                                }
                            }
                        }
                        break;
                }
            }
        },
        [treeViewElement]
    );

    if (!items) {
        return null;
    }

    return (
        <div
            // This `widget-tree-view-XX` className is necessary for the querySelectorAll call in the changeTreeViewBranchHeaderFocus callback (in test env).
            // It needs to be the first class or defined as an id. Since defining an id is quite enforcing, I made it a className.
            className={classNames(`widget-tree-view-${currentTreeViewUniqueId}`, "widget-tree-view", className)}
            style={style}
            ref={updateTreeViewElement}
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
        </div>
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
    changeFocus: (
        targetElement: EventTarget | null,
        focusTargetChange: FocusTargetChange,
        traverseOption?: "HORIZONTAL" | "VERTICAL"
    ) => void;
}

const treeViewBranchUtils = {
    bodyClassName: "widget-tree-view-body",
    getHeaderId: (id: TreeViewObject["id"]) => `${id}TreeViewBranchHeader`,
    getBodyId: (id: TreeViewObject["id"]) => `${id}TreeViewBranchBody`
};

function getTreeViewHeaderAccessibilityProps(
    isLeafNode: boolean,
    isExpanded: boolean,
    id: TreeViewObject["id"]
): HTMLAttributes<HTMLHeadElement> {
    const commonProps: HTMLAttributes<HTMLHeadElement> = {
        id: treeViewBranchUtils.getHeaderId(id),
        "aria-expanded": isExpanded,
        "aria-disabled": isLeafNode,
        "aria-controls": treeViewBranchUtils.getBodyId(id)
    };
    if (isLeafNode) {
        return {
            ...commonProps
        };
    }
    return {
        ...commonProps,
        tabIndex: 0,
        role: "button"
    };
}

const enum TreeViewState {
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

    const headerAccessibilityProps = getTreeViewHeaderAccessibilityProps(
        isActualLeafNode,
        treeViewState === TreeViewState.EXPANDED,
        props.id
    );

    const informParentToHaveChildNodes = useCallback<TreeViewBranchContextProps["informParentToHaveChildNodes"]>(
        hasChildNodes => {
            if (!hasChildNodes && !isActualLeafNode) {
                setIsActualLeafNode(true);
                changeFocus(headerRef.current, FocusTargetChange.NEXT);
            } else if (hasChildNodes && isActualLeafNode) {
                setIsActualLeafNode(false);
            }
        },
        [isActualLeafNode, changeFocus]
    );

    const onHeaderKeyDown = useCallback<KeyboardEventHandler<HTMLHeadElement>>(
        event => {
            switch (event.key) {
                case "Enter":
                case " ":
                    event.preventDefault();
                    event.stopPropagation();
                    toggleTreeViewContent();
                    break;
                case "Home":
                    event.preventDefault();
                    changeFocus(event.currentTarget, FocusTargetChange.FIRST);
                    break;
                case "End":
                    event.preventDefault();
                    changeFocus(event.currentTarget, FocusTargetChange.LAST);
                    break;
                case "Up": // Microsoft Edge value
                case "ArrowUp":
                    event.preventDefault();
                    changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "HORIZONTAL");
                    break;
                case "Down": // Microsoft Edge value
                case "ArrowDown":
                    event.preventDefault();
                    changeFocus(event.currentTarget, FocusTargetChange.NEXT, "HORIZONTAL");
                    break;
                case "Right": // Microsoft Edge value
                case "ArrowRight":
                    if (
                        treeViewState === TreeViewState.COLLAPSED_WITH_CSS ||
                        treeViewState === TreeViewState.COLLAPSED_WITH_JS
                    ) {
                        event.preventDefault();
                        toggleTreeViewContent();
                    }
                    if (treeViewState === TreeViewState.EXPANDED) {
                        event.preventDefault();
                        changeFocus(event.currentTarget, FocusTargetChange.NEXT, "VERTICAL");
                    }
                    break;
                case "Left": // Microsoft Edge value
                case "ArrowLeft":
                    if (
                        treeViewState === TreeViewState.COLLAPSED_WITH_CSS ||
                        treeViewState === TreeViewState.COLLAPSED_WITH_JS
                    ) {
                        event.preventDefault();
                        changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "VERTICAL");
                    }
                    if (treeViewState === TreeViewState.EXPANDED) {
                        event.preventDefault();
                        toggleTreeViewContent();
                    }
                    break;
            }
        },
        [toggleTreeViewContent, changeFocus, treeViewState]
    );

    return (
        <div className="widget-tree-view-branch">
            <header
                className={classNames("widget-tree-view-branch-header", {
                    "widget-tree-view-branch-header-clickable": !isActualLeafNode,
                    "widget-tree-view-branch-header-reversed": props.iconPlacement === "left"
                })}
                onClick={toggleTreeViewContent}
                onKeyDown={onHeaderKeyDown}
                ref={headerRef}
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
                        role="region"
                        aria-labelledby={treeViewBranchUtils.getHeaderId(props.id)}
                    >
                        {props.children}
                    </div>
                </TreeViewBranchContext.Provider>
            )}
        </div>
    );
}
