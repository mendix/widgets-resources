import { DropZoneProps, RowLayoutProps, StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";

import { DatasourceEnum, ImagePreviewProps } from "../typings/ImageProps";
import StructurePreviewImageSvg from "./assets/placeholder.svg";
import StructurePreviewImageDarkSvg from "./assets/placeholderDark.svg";

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

export function getProperties(values: ImagePreviewProps, defaultProperties: Properties): Properties {
    hidePropertiesIn(defaultProperties, values, filterDataSourceProperties(values.datasource));

    if (values.isBackgroundImage || values.imageIcon?.type === "glyph") {
        hidePropertiesIn(defaultProperties, values, [
            "widthUnit",
            "heightUnit",
            "customWidth",
            "customHeight",
            "onClickType",
            "onClick"
        ]);
    }
    if (!values.isBackgroundImage) {
        hidePropertiesIn(defaultProperties, values, ["children", "resizeMode", "opacity"]);
    }

    if (values.datasource === "icon") {
        hidePropertyIn(defaultProperties, values, "isBackgroundImage");
    }
    if (values.imageIcon?.type !== "glyph") {
        hidePropertyIn(defaultProperties, values, "iconSize");
    }

    if (values.datasource !== "image") {
        hidePropertyIn(defaultProperties, values, "defaultImageDynamic");
    }

    if (values.onClickType !== "action") {
        hidePropertyIn(defaultProperties, values, "onClick");
    }

    if (values.widthUnit === "auto") {
        hidePropertyIn(defaultProperties, values, "customWidth");
    }
    if (values.heightUnit === "auto") {
        hidePropertyIn(defaultProperties, values, "customHeight");
    }

    return defaultProperties;
}

export function getPreview(values: ImagePreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    if (!values.isBackgroundImage) {
        return {
            type: "Image",
            document: decodeURIComponent(
                (isDarkMode ? StructurePreviewImageDarkSvg : StructurePreviewImageSvg).replace(
                    "data:image/svg+xml,",
                    ""
                )
            ),
            height: 100,
            width: 100
        };
    }
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        backgroundColor: isDarkMode ? "#4F4F4F" : "#daeffb",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Image",
                        fontColor: isDarkMode ? "#DEDEDE" : "#2074c8"
                    }
                ]
            }
        ]
    };
    return {
        type: "Container",
        children: [
            titleHeader,
            {
                type: "RowLayout",
                children: [
                    {
                        type: "Container",
                        borders: true,
                        children: [
                            {
                                type: "DropZone",
                                property: values.children,
                                placeholder: "Content: Place widgets here"
                            } as DropZoneProps
                        ]
                    }
                ]
            } as RowLayoutProps
        ]
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
            message: "No image link provided"
        });
    }
    if (values.datasource === "icon" && !values.imageIcon) {
        errors.push({
            property: "imageIcon",
            message: "No icon selected"
        });
    }

    if (values.customWidth! < 1) {
        errors.push({
            property: "customWidth",
            message: "Width can not be smaller than 1"
        });
    }
    if (values.customHeight! < 1) {
        errors.push({
            property: "customHeight",
            message: "Height can not be smaller than 1"
        });
    }

    return errors;
}
