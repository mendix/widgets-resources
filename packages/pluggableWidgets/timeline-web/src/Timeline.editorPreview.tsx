import { TimelinePreviewProps } from "../typings/TimelineProps";
import TimelineComponent from "./components/TimelineComponent";
import { createElement, ReactNode } from "react";
import { ItemType } from "./Timeline";

declare function require(name: string): string;

export function preview(props: TimelinePreviewProps) {
    const structuredEvents = () => {
        const eventsMap = new Map<string | ReactNode, ItemType[]>();

        Array.from({ length: 5 }).forEach(() => {
            let constructedItem: ItemType;
            const date = props.eventTime;

            if (!date) {
                return;
            }

            if (props.renderMode === "basic") {
                constructedItem = {
                    icon: props.icon,
                    title: props.title,
                    time: date,
                    description: props.description
                };
            } else {
                constructedItem = {
                    icon: (
                        <props.customIcon.renderer>
                            <div />
                        </props.customIcon.renderer>
                    ),
                    dayDivider: (
                        <props.customDayDivider.renderer>
                            <div />
                        </props.customDayDivider.renderer>
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
                };
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
            showDayDivider={props.showDayDivider}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Timeline.scss");
}
