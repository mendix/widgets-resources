import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps
} from "@widgets-resources/piw-utils";
import { TimelinePreviewProps } from "../typings/TimelineProps";
import { lineAndC } from "./preview/preview";

export function getProperties(values: TimelinePreviewProps, defaultProperties: Properties): Properties {
    if (values.customVisualization) {
        hidePropertiesIn(defaultProperties, values, [
            "title",
            "description",
            "icon",
            "timeIndication",
            "groupByDayOptions",
            "groupByMonthOptions"
        ]);
    } else {
        hidePropertiesIn(defaultProperties, values, [
            "customIcon",
            "customTitle",
            "customEventDateTime",
            "customDescription",
            "customGroupHeader"
        ]);
    }
    if (!values.groupEvents) {
        hidePropertiesIn(defaultProperties, values, [
            "groupAttribute",
            "groupByKey",
            "groupByDayOptions",
            "groupByMonthOptions",
            "ungroupedEventsPosition",
            "customGroupHeader"
        ]);
    }
    switch (values.groupByKey) {
        case "day":
            hidePropertyIn(defaultProperties, values, "groupByMonthOptions");
            break;
        case "month":
            hidePropertyIn(defaultProperties, values, "groupByDayOptions");
            break;
        default:
            hidePropertiesIn(defaultProperties, values, ["groupByDayOptions", "groupByMonthOptions"]);
            break;
    }
    return defaultProperties;
}

export function check(values: TimelinePreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (!values.customVisualization) {
        if (!values.title) {
            errors.push({
                property: "title",
                severity: "error",
                message: "The Title property is required for the default visualization.",
                url: ""
            });
        }
    }
    if (values.groupEvents && !values.groupAttribute) {
        errors.push({
            property: "title",
            severity: "error",
            message: "A Group attribute is required when the Group Events option is enabled.",
            url: ""
        });
    }
    return errors;
}

export function getPreview(values: TimelinePreviewProps): StructurePreviewProps {
    return {
        type: "Container",
        children: [
            {
                type: "RowLayout",
                children: [
                    {
                        type: "Container",
                        children: [{ content: "Today", type: "Text", fontSize: 12, bold: true, grow: 0 }],
                        borderRadius: 15,
                        borderWidth: 1,
                        borders: true,
                        grow: 0,
                        padding: 100
                    },
                    { content: "", type: "Text", grow: 1 }
                ],
                columnSize: "grow"
            },
            buildRow(values),
            buildRow(values),
            buildRow(values),
            buildRow(values)
        ]
    };
}

function buildRow(values: TimelinePreviewProps): StructurePreviewProps {
    return {
        type: "RowLayout",
        children: [
            {
                type: "Image",
                document: lineAndC,
                width: 65,
                grow: 0
            },
            {
                type: "Container",
                children: [
                    { type: "Text", content: "-", fontColor: "white" },
                    { type: "Text", content: "-", fontColor: "white" },
                    {
                        type: "RowLayout",
                        children: [
                            { type: "Text", content: values.title },
                            { type: "Text", content: "", grow: 3 },
                            { type: "Text", content: values.timeIndication }
                        ]
                    },
                    { type: "Text", content: values.description }
                ]
            }
        ],
        columnSize: "grow"
    };
}
/*

 TODO(jordan):
. padding to text inside bubble isn't taking effect. Isa says newer modeler will work. 9.0.4

. image width and height are fixed, is this okay for all situations?

. the two texts "-" are used for layout. coloured white. is this okay? what about dark mode?

. figure out where the svg code should live


 */
