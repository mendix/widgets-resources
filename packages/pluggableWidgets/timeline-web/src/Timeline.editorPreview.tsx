import { TimelinePreviewProps } from "../typings/TimelineProps";
import TimelineComponent from "./components/TimelineComponent";
import { createElement } from "react";
import { BasicItemType, CustomItemType, ItemType } from "./Timeline";
import { dynamicValue } from "@widgets-resources/piw-utils";

declare function require(name: string): string;

export function preview(props: TimelinePreviewProps) {
    const structuredEvents = () => {
        const eventsMap = new Map<string, ItemType[]>();

        Array.from({ length: 5 }).forEach(() => {
            let constructedItem: ItemType;
            const date = props.eventTime;

            if (!date) {
                return;
            }

            if (props.renderMode === "basic") {
                constructedItem = {
                    icon: dynamicValue(props.icon),
                    title: props.title,
                    eventDateTime: date,
                    description: props.description
                } as BasicItemType;
            } else {
                constructedItem = {
                    icon: (
                        <props.customIcon.renderer>
                            <div />
                        </props.customIcon.renderer>
                    ),
                    groupDivider: (
                        <props.customGroupDivider.renderer>
                            <div />
                        </props.customGroupDivider.renderer>
                    ),
                    title: (
                        <props.customTitle.renderer>
                            <div />
                        </props.customTitle.renderer>
                    ),
                    eventDateTime: (
                        <props.customEventDateTime.renderer>
                            <div />
                        </props.customEventDateTime.renderer>
                    ),
                    description: (
                        <props.customDescription.renderer>
                            <div />
                        </props.customDescription.renderer>
                    )
                } as CustomItemType;
            }

            const currentDates = eventsMap.get(date);
            if (currentDates) {
                currentDates.push(constructedItem);
            } else {
                eventsMap.set(date, [constructedItem]);
            }
        });

        return eventsMap;
    };
    return (
        <TimelineComponent
            data={structuredEvents()}
            renderMode={props.renderMode}
            showGroupDivider={props.showGroupDivider}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Timeline.scss");
}
