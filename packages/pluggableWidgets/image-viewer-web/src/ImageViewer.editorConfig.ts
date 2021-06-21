import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { DatasourceEnum, ImageViewerPreviewProps } from "../typings/ImageViewerProps";

type ImageViewPreviewPropsKey = keyof ImageViewerPreviewProps;

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

export function getProperties(
    values: ImageViewerPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    hidePropertiesIn(defaultProperties, values, filterDataSourceProperties(values.datasource));

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

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(): StructurePreviewProps | null {
    // TODO:
    return null;
}

export function check(values: ImageViewerPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.datasource === "image" && !values.imageObject) {
        errors.push({
            property: "imageObject",
            message: "No image selected"
        });
    }
    if (values.datasource === "imageUrl" && !values.imageUrl) {
        errors.push({
            property: "imageUrl",
            message: "No image link provided"
        });
    }
    if (values.datasource === "icon" && !values.imageIcon) {
        errors.push({
            property: "imageIcon",
            message: "No icon selected"
        });
    }

    return errors;
}
