import { createElement, FunctionComponent } from "react";
import { TreeViewContainerProps } from "../typings/TreeViewProps";
import { TreeView as TreeViewComponent } from "./components/TreeView";

export const TreeView: FunctionComponent<TreeViewContainerProps> = props => {
    // TODO: Handle async states more gracefully?
    const items =
        props.datasource.items?.map(item => {
            return {
                id: item.id,
                value: props.caption?.get(item).value,
                content: props.children?.get(item)
            };
        }) ?? [];

    return (
        <TreeViewComponent
            class={props.class}
            style={props.style}
            items={items}
            isUserDefinedLeafNode={!props.hasChildren}
            startExpanded={props.startExpanded}
        />
    );
};
