import classNames from "classnames";
import { GUID } from "mendix";
import { createElement, CSSProperties, ReactElement, ReactNode, useState } from "react";

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
                <TreeViewObject
                    key={treeViewItem.id}
                    value={treeViewItem.value}
                    hasChildren={hasChildren}
                    startExpanded={startExpanded}
                >
                    {treeViewItem.content}
                </TreeViewObject>
            ))}
        </div>
    );
}

interface TreeViewObjectProps extends Omit<TreeViewObject, "id"> {
    hasChildren: boolean;
    startExpanded: boolean;
    children: ReactNode;
}

function TreeViewObject(props: TreeViewObjectProps): ReactElement {
    const [treeViewIsExpanded, setTreeViewIsExpanded] = useState<boolean>(props.startExpanded);

    function toggleTreeViewContent(): void {
        if (props.hasChildren) {
            setTreeViewIsExpanded(isExpanded => !isExpanded);
        }
    }

    console.log({ value: props.value, chidlren: props.children });
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
                tabIndex={props.hasChildren ? 0 : undefined}
                role={props.hasChildren ? "button" : undefined}
            >
                {props.value}
            </h2>
            {props.hasChildren && treeViewIsExpanded && <div className="tree-view-body">{props.children}</div>}
        </div>
    );
}
