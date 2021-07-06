import { GUID } from "mendix";
import { createElement, CSSProperties, HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import classNames from "classnames";

import "../ui/TreeView.scss";

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
}

export function TreeView({
    name,
    class: className,
    items,
    style,
    isUserDefinedLeafNode,
    startExpanded
}: TreeViewProps): ReactElement {
    // TODO: for lazy loading/knowing whether there are children, it might be better to not render any DOM here if there are no items.
    return (
        <div className={classNames("widget-tree-view", className)} style={style} id={name}>
            {items.map(({ id, value, content }) => (
                <TreeViewBranch
                    key={id}
                    value={value}
                    isUserDefinedLeafNode={isUserDefinedLeafNode}
                    startExpanded={startExpanded}
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
            <h2
                className={classNames("widget-tree-view-header", {
                    "widget-tree-view-header-clickable": !props.isUserDefinedLeafNode
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
                {props.value}
                {!props.isUserDefinedLeafNode && (
                    // TODO: This should not be a glyphicon, but rather a svg or something that is not dependent on Atlas
                    <span className={`glyphicon ${treeViewIsExpanded ? "glyphicon-minus" : "glyphicon-plus"}`} />
                )}
            </h2>
            {/* TODO: For lazy loading and to prevent reloading the children data every time, it might be better to implement the 2nd "collapse" through CSS */}
            {!props.isUserDefinedLeafNode && treeViewIsExpanded && (
                <div className="widget-tree-view-body">{props.children}</div>
            )}
        </div>
    );
}
