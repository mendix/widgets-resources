import { createElement, ReactElement, ReactNode, useMemo } from "react";
import { TimelineContainerProps } from "../typings/TimelineProps";
import "./ui/Timeline.scss";
import { DynamicValue, WebIcon } from "mendix";
import TimelineComponent from "./components/TimelineComponent";

export interface BasicItemType {
    icon?: DynamicValue<WebIcon>;
    title?: string;
    date?: string;
    time?: string;
    description?: string;
}

export interface CustomItemType {
    icon?: ReactNode;
    dayDivider?: ReactNode;
    title?: ReactNode;
    eventDateTime?: ReactNode;
    description?: ReactNode;
}

export type ItemType = BasicItemType | CustomItemType;

export default function Timeline(props: TimelineContainerProps): ReactElement {
    const structuredEvents = useMemo((): Map<string | ReactNode, ItemType[]> => {
        const eventsMap = new Map<string | ReactNode, ItemType[]>();

        props.data.items?.forEach(item => {
            let constructedItem: ItemType;
            const eventTime = props.eventTime(item);
            const date = eventTime.value;
            if (!date) {
                return;
            }
            let dateFormatter = eventTime.formatter;
            let timeFormatter = eventTime.formatter;

            if (dateFormatter?.type === "datetime") {
                dateFormatter = dateFormatter.withConfig({ type: "date" });
                timeFormatter = dateFormatter.withConfig({ type: "time" });
            }

            if (props.renderMode === "basic") {
                constructedItem = {
                    icon: props.icon,
                    title: props.title?.(item).displayValue,
                    date: dateFormatter?.format(eventTime.value),
                    time: timeFormatter?.format(eventTime.value),
                    description: props.description?.(item).displayValue
                };
            } else {
                constructedItem = {
                    icon: props.customIcon?.(item),
                    dayDivider: props.customDayDivider?.(item),
                    title: props.customTitle?.(item),
                    eventDateTime: props.customEventDateTime?.(item),
                    description: props.customDescription?.(item)
                };
            }

            const currentDates = eventsMap.get(dateFormatter?.format(eventTime.value));
            if (currentDates) {
                currentDates.push(constructedItem);
            } else {
                eventsMap.set(dateFormatter?.format(eventTime.value), [constructedItem]);
            }
        });

        return eventsMap;
    }, [props.data]);

    return (
        <TimelineComponent
            data={structuredEvents}
            showDayDivider={props.showDayDivider}
            renderMode={props.renderMode}
        />
    );
}
