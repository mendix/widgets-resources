import {
    hidePropertiesIn,
    hidePropertyIn,
    moveProperty,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { DatasourceEnum, ImagePreviewProps } from "../typings/ImageProps";
import StructurePreviewImageViewerSvg from "./assets/placeholder.svg";

type ImageViewPreviewPropsKey = keyof ImagePreviewProps;

const dataSourceProperties: ImageViewPreviewPropsKey[] = ["imageObject", "imageUrl", "imageIcon"];

function filterDataSourceProperties(sourceProperty: DatasourceEnum): ImageViewPreviewPropsKey[] {
    switch (sourceProperty) {
        case "image":
            return dataSourceProperties.filter(prop => prop !== "imageObject");
        case "imageUrl":
            return dataSourceProperties.filter(prop => prop !== "imageUrl");
        case "icon":
            return dataSourceProperties.filter(prop => prop !== "imageIcon");
        default:
            return dataSourceProperties;
    }
}

function reorderTabsForStudio(tabs: Properties): void {
    const dimensionsTabIndex = tabs.findIndex(
        tab => tab.caption === "Dimensions" && tab.properties && tab.properties.length > 0
    );
    const dataSourceTabIndex = tabs.findIndex(
        tab => tab.caption === "Data source" && tab.properties && tab.properties.length > 0
    );
    if (dimensionsTabIndex >= 0 && dataSourceTabIndex >= 0) {
        moveProperty(dimensionsTabIndex, dataSourceTabIndex + 1, tabs);
    }
}

export function getProperties(
    values: ImagePreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    hidePropertiesIn(defaultProperties, values, filterDataSourceProperties(values.datasource));

    if (values.datasource !== "image") {
        hidePropertyIn(defaultProperties, values, "defaultImageDynamic");
    }

    if (values.heightUnit === "auto") {
        hidePropertyIn(defaultProperties, values, "height");
    }

    if (values.widthUnit === "auto") {
        hidePropertyIn(defaultProperties, values, "width");
    }

    if (values.datasource === "icon" && values.imageIcon?.type === "glyph") {
        hidePropertiesIn(defaultProperties, values, ["widthUnit", "width", "heightUnit", "height"]);
    } else {
        hidePropertyIn(defaultProperties, values, "iconSize");
    }

    if (values.onClickType !== "action") {
        hidePropertyIn(defaultProperties, values, "onClick");
    }

    if (values.datasource !== "image") {
        hidePropertyIn(defaultProperties, values, "displayAs");
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
        reorderTabsForStudio(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(StructurePreviewImageViewerSvg.replace("data:image/svg+xml,", "")),
        height: 100,
        width: 100
    };
}

export function check(values: ImagePreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.datasource === "image" && !values.imageObject) {
        errors.push({
            property: "imageObject",
            message: "No image selected."
        });
    }
    if (values.datasource === "imageUrl" && !values.imageUrl) {
        errors.push({
            property: "imageUrl",
            message: "No image link provided."
        });
    }
    if (values.datasource === "icon" && !values.imageIcon) {
        errors.push({
            property: "imageIcon",
            message: "No icon selected."
        });
    }

    return errors;
}
