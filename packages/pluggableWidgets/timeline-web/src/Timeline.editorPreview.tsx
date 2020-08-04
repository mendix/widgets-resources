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
            const eventTime = props.eventTime;
            const date = eventTime;
            if (!date) {
                return;
            }

            if (props.renderMode === "basic") {
                constructedItem = {
                    icon: props.icon,
                    title: props.title,
                    date: eventTime,
                    time: eventTime,
                    description: props.description
                };
            } else {
                constructedItem = {
                    icon: props.customIcon,
                    dayDivider: props.customDayDivider,
                    title: props.customTitle,
                    eventDateTime: props.customEventDateTime,
                    description: props.customDescription
                };
            }

            const currentDates = eventsMap.get(eventTime);
            if (currentDates) {
                currentDates.push(constructedItem);
            } else {
                eventsMap.set(eventTime, [constructedItem]);
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
