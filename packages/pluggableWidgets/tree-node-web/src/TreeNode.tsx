import { createElement, ReactElement } from "react";
import { ObjectItem, ValueStatus } from "mendix";
import { TreeNodeContainerProps } from "../typings/TreeNodeProps";
import { TreeNode as TreeNodeComponent, TreeNodeObject } from "./components/TreeNode";

function mapDataSourceItemToTreeNodeObject(item: ObjectItem, props: TreeNodeContainerProps): TreeNodeObject {
    return {
        id: item.id,
        value: props.headerType === "text" ? props.headerCaption?.get(item).value : props.headerContent?.get(item),
        content: props.children?.get(item)
    };
}

export function TreeNode(props: TreeNodeContainerProps): ReactElement {
    // TODO: Handle async states more gracefully?
    const items =
        props.datasource.status === ValueStatus.Available
            ? props.datasource.items?.map(item => mapDataSourceItemToTreeNodeObject(item, props)) ?? []
            : null;

    const expandedIcon = props.expandedIcon?.status === ValueStatus.Available ? props.expandedIcon.value : null;
    const collapsedIcon = props.collapsedIcon?.status === ValueStatus.Available ? props.collapsedIcon.value : null;

    return (
        <TreeNodeComponent
            class={props.class}
            style={props.style}
            items={items}
            isUserDefinedLeafNode={!props.hasChildren}
            startExpanded={props.startExpanded}
            showCustomIcon={Boolean(props.expandedIcon) || Boolean(props.collapsedIcon)}
            iconPlacement={props.showIcon}
            expandedIcon={expandedIcon}
            collapsedIcon={collapsedIcon}
            tabIndex={props.tabIndex}
            animateIcon={props.animate && props.animateIcon}
            animateTreeNodeContent={props.animate}
        />
    );
}
