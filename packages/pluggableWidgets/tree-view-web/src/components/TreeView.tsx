import { WebIcon, ObjectItem } from "mendix";
import {
    createElement,
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    useCallback,
    useContext,
    useState
} from "react";
import classNames from "classnames";

import "../ui/TreeView.scss";
import { ShowIconEnum } from "../../typings/TreeViewProps";
import { Icon } from "./Icon";
import {
    TreeViewBranchContextProps,
    TreeViewBranchContext,
    useInformParentContextToHaveChildNodes
} from "./TreeViewBranchContext";

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

export function TreeView({
    name,
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
    const { childShouldShowPlaceholder: shouldShowPlaceholder } = useContext(TreeViewBranchContext);

    const renderHeaderIcon = useCallback<TreeViewBranchProps["renderHeaderIcon"]>(
        (treeViewIsExpanded: boolean) =>
            showCustomIcon ? (
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
            ),
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
        return treeViewElement?.parentElement?.className.includes(treeViewBodyClassName) ?? false;
    }, [treeViewElement]);

    useInformParentContextToHaveChildNodes(items, isInsideAnotherTreeView);

    if (!items) {
        return shouldShowPlaceholder ? (
            <div className="widget-tree-view-lazy-loading-placeholder">
                <img src={loadingCircleSvg} className="widget-tree-view-loading-spinner" alt="Loading spinner" />
                <span className="widget-tree-view-placeholder-text">Loading...</span>
            </div>
        ) : null;
    }

    return (
        <div className={classNames("widget-tree-view", className)} style={style} id={name} ref={updateTreeViewElement}>
            {items.map(({ id, value, content }) => (
                <TreeViewBranch
                    key={id}
                    value={value}
                    isUserDefinedLeafNode={isUserDefinedLeafNode}
                    shouldLazyLoad={shouldLazyLoad}
                    startExpanded={startExpanded}
                    iconPlacement={iconPlacement}
                    renderHeaderIcon={renderHeaderIcon}
                >
                    {content}
                </TreeViewBranch>
            ))}
        </div>
    );
}

interface TreeViewBranchProps {
    isUserDefinedLeafNode: boolean;
    shouldLazyLoad: boolean;
    startExpanded: boolean;
    value: TreeViewObject["value"];
    children: TreeViewObject["content"];
    iconPlacement: ShowIconEnum;
    renderHeaderIcon: (treeViewIsExpanded: boolean) => ReactNode;
}

function getTreeViewHeaderAccessibilityProps(isLeafNode: boolean): HTMLAttributes<HTMLHeadingElement> {
    if (isLeafNode) {
        return {};
    }
    return {
        tabIndex: 0,
        role: "button"
    };
}

const treeViewBodyClassName = "widget-tree-view-body";

function TreeViewBranch(props: TreeViewBranchProps): ReactElement {
    const { level: currentContextLevel } = useContext(TreeViewBranchContext);
    const [treeViewState, setTreeViewState] = useState<"COLLAPSED_WITH_JS" | "COLLAPSED_WITH_CSS" | "EXPANDED">(
        !props.shouldLazyLoad && props.startExpanded ? "EXPANDED" : "COLLAPSED_WITH_JS"
    );
    const [isActualLeafNode, setIsActualLeafNode] = useState<boolean>(props.isUserDefinedLeafNode || !props.children);

    const toggleTreeViewContent = useCallback(() => {
        if (!isActualLeafNode) {
            setTreeViewState(treeViewState => {
                if (treeViewState === "COLLAPSED_WITH_JS" || treeViewState === "COLLAPSED_WITH_CSS") {
                    return "EXPANDED";
                }
                return props.shouldLazyLoad ? "COLLAPSED_WITH_CSS" : "COLLAPSED_WITH_JS";
            });
        }
    }, [isActualLeafNode, props.shouldLazyLoad]);

    const headerAccessibilityProps = getTreeViewHeaderAccessibilityProps(isActualLeafNode);

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

    return (
        <div className="widget-tree-view-branch">
            <header
                className={classNames("widget-tree-view-branch-header", {
                    "widget-tree-view-branch-header-clickable": !isActualLeafNode,
                    "widget-tree-view-branch-header-reversed": props.iconPlacement === "left"
                })}
                onClick={toggleTreeViewContent}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        toggleTreeViewContent();
                    }
                }}
                {...headerAccessibilityProps}
            >
                <span className="widget-tree-view-branch-header-value">{props.value}</span>
                {!isActualLeafNode &&
                    props.iconPlacement !== "no" &&
                    props.renderHeaderIcon(treeViewState === "EXPANDED")}
            </header>
            {!isActualLeafNode && treeViewState !== "COLLAPSED_WITH_JS" && (
                <TreeViewBranchContext.Provider
                    value={{
                        level: currentContextLevel + 1,
                        informParentToHaveChildNodes,
                        childShouldShowPlaceholder: props.shouldLazyLoad
                    }}
                >
                    <div
                        className={classNames(treeViewBodyClassName, {
                            "widget-tree-view-branch-hidden": treeViewState === "COLLAPSED_WITH_CSS"
                        })}
                    >
                        {props.children}
                    </div>
                </TreeViewBranchContext.Provider>
            )}
        </div>
    );
}
