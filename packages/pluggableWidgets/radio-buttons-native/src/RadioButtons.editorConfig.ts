import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { Properties, hidePropertiesIn } from "@mendix/pluggable-widgets-tools";

import { RadioButtonsPreviewProps } from "../typings/RadioButtonsProps";
import darkRadioIcon from "./assets/radioButton_dark.svg";
import lightRadioIcon from "./assets/radioButton_light.svg";
import lightUnselectedRadioIcon from "./assets/radioButton_unselected_light.svg";
import darkUnselectedRadioIcon from "./assets/radioButton_unselected_dark.svg";

export function getPreview(values: RadioButtonsPreviewProps, isDark: boolean): StructurePreviewProps {
    const EditableFontColor = isDark ? "#D6D6D6" : "#0A1324";
    const readOnlyFontColor = "#9DA1A8";
    const fontColor = values.readOnly ? readOnlyFontColor : EditableFontColor;
    const radioButtonLabel: StructurePreviewProps = {
        type: "Container",
        borders: false,
        children: [
            {
                type: "Text",
                content: values.label,
                fontColor
            },
            {
                type: "Container",
                padding: 4
            }
        ]
    };

    const selectedRadioButtonImage: StructurePreviewProps = {
        type: "Image",
        document: decodeURIComponent((isDark ? darkRadioIcon : lightRadioIcon).replace("data:image/svg+xml,", "")),
        width: 16,
        height: 16
    };

    const unselectedRadioButtonImage: StructurePreviewProps = {
        type: "Image",
        document: decodeURIComponent(
            (isDark ? darkUnselectedRadioIcon : lightUnselectedRadioIcon).replace("data:image/svg+xml,", "")
        ),
        width: 16,
        height: 16
    };

    const radioButtonItemLabel: StructurePreviewProps = {
        type: "Text",
        content: values.enum !== "" ? values.enum : "[No attribute selected]",
        fontColor
    };

    const generateRadioButtonItem = (enumValue: string): StructurePreviewProps[] => {
        const radioButtonItemTmp: StructurePreviewProps = {
            type: "Container",
            children: [enumValue !== "" ? selectedRadioButtonImage : unselectedRadioButtonImage],
            padding: 2
        };

        const item: StructurePreviewProps = {
            type: "RowLayout",
            columnSize: "grow",
            children: [
                {
                    ...radioButtonItemTmp
                },
                {
                    type: "Container",
                    children: [radioButtonItemLabel]
                },
                {
                    type: "Container"
                }
            ]
        };

        if (enumValue !== "") {
            const item2: StructurePreviewProps = {
                ...item,
                children: [
                    {
                        ...radioButtonItemTmp,
                        children: [unselectedRadioButtonImage]
                    },
                    {
                        type: "Container",
                        children: [radioButtonItemLabel]
                    },
                    {
                        type: "Container"
                    }
                ]
            };

            return [item, item2];
        }

        return [item];
    };

    const radioButtonItems = generateRadioButtonItem(values.enum);

    const radioButtonListContainer: StructurePreviewProps = {
        type: "Container",
        children: [...radioButtonItems]
    };

    const radioButtonListRow: StructurePreviewProps = {
        type: "RowLayout",
        children: [...radioButtonItems]
    };

    const radioButtonListOrientation =
        values.orientation === "horizontal" ? radioButtonListRow : radioButtonListContainer;

    const radioButtonList = values.showLabel
        ? [radioButtonLabel, radioButtonListOrientation]
        : [radioButtonListOrientation];

    const radioButtonContainer: StructurePreviewProps = {
        type: "Container",
        children: radioButtonList
    };

    return {
        type: "Container",
        borders: false,
        padding: 4,
        children: [radioButtonContainer]
    };
}

export function getProperties(values: RadioButtonsPreviewProps, defaultProperties: Properties): Properties {
    if (!values.showLabel) {
        hidePropertiesIn(defaultProperties, values, ["label"]);
    }
    return defaultProperties;
}
