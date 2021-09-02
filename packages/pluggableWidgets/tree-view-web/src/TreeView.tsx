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

    const expandedIcon = props.expandedIcon?.status === ValueStatus.Available ? props.expandedIcon.value : null;
    const collapsedIcon = props.collapsedIcon?.status === ValueStatus.Available ? props.collapsedIcon.value : null;

    return (
        <TreeViewComponent
            name={props.name}
            class={props.class}
            style={props.style}
            items={items}
            isUserDefinedLeafNode={!props.hasChildren}
            startExpanded={props.startExpanded}
            showCustomIcon={props.advancedMode && (Boolean(props.expandedIcon) || Boolean(props.collapsedIcon))}
            iconPlacement={props.showIcon}
            expandedIcon={expandedIcon}
            collapsedIcon={collapsedIcon}
            tabIndex={props.tabIndex}
            animateIcon={props.animate && props.animateIcon}
            animateTreeViewContent={props.animate}
        />
    );
}
