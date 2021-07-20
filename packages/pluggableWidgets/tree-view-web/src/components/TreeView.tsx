import { GUID, WebIcon } from "mendix";
import { createElement, CSSProperties, HTMLAttributes, ReactElement, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";
import { Icon } from "@mendix/piw-utils-internal";

import "../ui/TreeView.scss";
import { ShowIconEnum } from "../../typings/TreeViewProps";

interface TreeViewObject {
    id: GUID;
    value: string | ReactNode | undefined;
    content: ReactNode;
}

export interface TreeViewProps {
    name?: string;
    class: string;
    style?: CSSProperties;
    items: TreeViewObject[];
    isUserDefinedLeafNode: TreeViewBranchProps["isUserDefinedLeafNode"];
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
    startExpanded,
    iconPlacement,
    expandIcon,
    collapseIcon
}: TreeViewProps): ReactElement {
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
    // TODO: for lazy loading/knowing whether there are children, it might be better to not render any DOM here if there are no items.
    return (
        <div className={classNames("widget-tree-view", className)} style={style} id={name}>
            {items.map(({ id, value, content }) => (
                <TreeViewBranch
                    key={id}
                    value={value}
                    isUserDefinedLeafNode={isUserDefinedLeafNode}
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

function TreeViewBranch(props: TreeViewBranchProps): ReactElement {
    const [treeViewIsExpanded, setTreeViewIsExpanded] = useState<boolean>(props.startExpanded);

    function toggleTreeViewContent(): void {
        if (!props.isUserDefinedLeafNode) {
            setTreeViewIsExpanded(isExpanded => !isExpanded);
        }
    }

    const headerAccessibilityProps = getTreeViewHeaderAccessibilityProps(props.isUserDefinedLeafNode);

    return (
        <div className="widget-tree-view-branch">
            <header
                className={classNames("widget-tree-view-branch-header", {
                    "widget-tree-view-branch-header-clickable": !props.isUserDefinedLeafNode,
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
                {!props.isUserDefinedLeafNode &&
                    props.iconPlacement !== "no" &&
                    props.renderHeaderIcon(treeViewIsExpanded)}
            </header>
            {/* TODO: For lazy loading and to prevent reloading the children data every time, it might be better to implement the 2nd "collapse" through CSS */}
            {!props.isUserDefinedLeafNode && treeViewIsExpanded && (
                <div className="widget-tree-view-body">{props.children}</div>
            )}
        </div>
    );
}
