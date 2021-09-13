import { parseStyle } from "@mendix/piw-utils-internal";
import { GUID, WebIcon } from "mendix";
import { createElement, ReactElement } from "react";
import { TreeNodePreviewProps } from "../typings/TreeNodeProps";
import { TreeNode } from "./components/TreeNode";

function mapIconToWebIcon(icon: TreeNodePreviewProps["expandedIcon"] | TreeNodePreviewProps["collapsedIcon"]): WebIcon {
    if (icon) {
        if (icon.type === "glyph") {
            return {
                type: "glyph",
                iconClass: icon.iconClass
            };
        }
        return {
            type: "image",
            iconUrl: icon.imageUrl
        };
    }
    return undefined;
}

function renderTextTemplateWithFallback(textTemplateValue: string, placeholder: string): string {
    if (textTemplateValue.trim().length === 0) {
        return placeholder;
    }
    return textTemplateValue;
}

export function preview(props: TreeNodePreviewProps): ReactElement | null {
    return (
        <TreeNode
            class={props.class}
            style={parseStyle(props.style)}
            items={[
                {
                    id: "1" as GUID,
                    value:
                        props.headerType === "text" ? (
                            renderTextTemplateWithFallback(props.headerCaption, "[No header caption configured]")
                        ) : (
                            <props.headerContent.renderer caption="Place header contents here.">
                                <div />
                            </props.headerContent.renderer>
                        ),
                    content: (
                        <props.children.renderer caption="Place other tree nodes here.">
                            <div />
                        </props.children.renderer>
                    )
                }
            ]}
            isUserDefinedLeafNode={!props.hasChildren}
            startExpanded
            showCustomIcon={props.advancedMode && (Boolean(props.expandedIcon) || Boolean(props.collapsedIcon))}
            iconPlacement={props.showIcon}
            expandedIcon={mapIconToWebIcon(props.expandedIcon)}
            collapsedIcon={mapIconToWebIcon(props.collapsedIcon)}
            animateIcon={false}
            animateTreeNodeContent={false}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/TreeNode.scss");
}
