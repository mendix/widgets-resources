import { GUID } from "mendix";
import { createElement, CSSProperties, HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import classNames from "classnames";

import "../ui/TreeView.scss";

interface TreeViewObject {
    id: GUID;
    value?: string;
    content?: ReactNode;
}

export interface TreeViewProps {
    class: string;
    style?: CSSProperties;
    items: TreeViewObject[];
    hasChildren: boolean;
    startExpanded: boolean;
}

export function TreeView({ class: className, items, style, hasChildren, startExpanded }: TreeViewProps): ReactElement {
    return (
        <div className={classNames("mx-tree-view", className)} style={style}>
            {items.map(treeViewItem => (
                <TreeViewBranch
                    key={treeViewItem.id}
                    value={treeViewItem.value}
                    hasChildren={hasChildren}
                    startExpanded={startExpanded}
                >
                    {treeViewItem.content}
                </TreeViewBranch>
            ))}
        </div>
    );
}

interface TreeViewBranchProps extends Omit<TreeViewObject, "id"> {
    hasChildren: boolean;
    startExpanded: boolean;
    children: ReactNode;
}

function getTreeViewHeaderAccessibilityProps(hasChildren: boolean): HTMLAttributes<HTMLHeadingElement> {
    if (hasChildren) {
        return {
            tabIndex: 0,
            role: "button"
        };
    }
    return {};
}

function TreeViewBranch(props: TreeViewBranchProps): ReactElement {
    const [treeViewIsExpanded, setTreeViewIsExpanded] = useState<boolean>(props.startExpanded);

    function toggleTreeViewContent(): void {
        if (props.hasChildren) {
            setTreeViewIsExpanded(isExpanded => !isExpanded);
        }
    }

    const headerAccessibilityProps = getTreeViewHeaderAccessibilityProps(props.hasChildren);

    return (
        <div className="tree-view-object">
            <h2
                className={classNames("tree-view-header", { "tree-view-header-expandable": props.hasChildren })}
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
                {props.hasChildren && (
                    <span className={`glyphicon ${treeViewIsExpanded ? "glyphicon-minus" : "glyphicon-plus"}`} />
                )}
            </h2>
            {props.hasChildren && treeViewIsExpanded && <div className="tree-view-body">{props.children}</div>}
        </div>
    );
}
