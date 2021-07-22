import { createElement, ReactElement } from "react";
import { ObjectItem, ValueStatus } from "mendix";
import { TreeViewContainerProps } from "../typings/TreeViewProps";
import { TreeView as TreeViewComponent, TreeViewObject } from "./components/TreeView";

function mapDataSourceItemToTreeViewObject(item: ObjectItem, props: TreeViewContainerProps): TreeViewObject {
    return {
        id: item.id,
        value: props.headerType === "text" ? props.headerCaption?.get(item).value : props.headerContent?.get(item),
        content: props.children?.get(item)
    };
}

export function TreeView(props: TreeViewContainerProps): ReactElement {
    // TODO: Handle async states more gracefully?
    const items =
        props.datasource.status === ValueStatus.Available
            ? props.datasource.items?.map(item => mapDataSourceItemToTreeViewObject(item, props)) ?? []
            : null;

    const expandIcon = props.expandIcon?.status === ValueStatus.Available ? props.expandIcon.value : null;
    const collapseIcon = props.collapseIcon?.status === ValueStatus.Available ? props.collapseIcon.value : null;

    return (
        <TreeViewComponent
            name={props.name}
            class={props.class}
            style={props.style}
            items={items}
            isUserDefinedLeafNode={!props.hasChildren}
            shouldLazyLoad={props.shouldLazyLoad}
            startExpanded={props.startExpanded}
            showCustomIcon={props.advancedMode}
            iconPlacement={props.showIcon}
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
        />
    );
}
