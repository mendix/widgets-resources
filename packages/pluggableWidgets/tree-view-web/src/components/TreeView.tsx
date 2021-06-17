import { GUID } from "mendix";
import { createElement, CSSProperties, HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import classNames from "classnames";

import "../ui/TreeView.scss";

interface TreeViewObject {
    id: GUID;
    value: string | undefined;
    content: ReactNode;
}

export interface TreeViewProps {
    class: string;
    style?: CSSProperties;
    items: TreeViewObject[];
    isUserDefinedLeafNode: TreeViewBranchProps["isUserDefinedLeafNode"];
    startExpanded: TreeViewBranchProps["startExpanded"];
}

export function TreeView({
    class: className,
    items,
    style,
    isUserDefinedLeafNode,
    startExpanded
}: TreeViewProps): ReactElement {
    return (
        <div className={classNames("mx-tree-view", className)} style={style}>
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
        <div className="tree-view-object">
            <h2
                className={classNames("tree-view-header", {
                    "tree-view-header-expandable": !props.isUserDefinedLeafNode
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
                    <span className={`glyphicon ${treeViewIsExpanded ? "glyphicon-minus" : "glyphicon-plus"}`} />
                )}
            </h2>
            {!props.isUserDefinedLeafNode && treeViewIsExpanded && (
                <div className="tree-view-body">{props.children}</div>
            )}
        </div>
    );
}
