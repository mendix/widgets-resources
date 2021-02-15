import { createElement, ReactElement, ReactNode, useMemo } from "react";
import { TimelineContainerProps } from "../typings/TimelineProps";
import "./ui/Timeline.scss";
import { ActionValue, WebIcon } from "mendix";
import TimelineComponent, { getGroupHeaderByType } from "./components/TimelineComponent";
import { getHeaderOption } from "./utils/utils";

export interface BasicItemType {
    icon?: WebIcon;
    title?: string;
    eventDateTime?: string;
    description?: string;
    action?: ActionValue;
}

export interface CustomItemType {
    icon?: ReactNode;
    title?: ReactNode;
    eventDateTime?: ReactNode;
    description?: ReactNode;
    action?: ActionValue;
    groupHeader?: ReactNode;
}

export type ItemType = BasicItemType | CustomItemType;

export default function Timeline(props: TimelineContainerProps): ReactElement {
    const groupedEvents = useMemo((): Map<string, ItemType[]> => {
        const eventsMap = new Map<string, ItemType[]>();

        props.data.items?.forEach(item => {
            let constructedItem: ItemType;
            const groupAttribute = props.groupAttribute?.(item);
            const date = groupAttribute?.value;
            let groupKey;

            if (!props.customVisualization) {
                groupKey = getGroupHeaderByType(groupAttribute?.formatter, getHeaderOption(props), date);
                constructedItem = {
                    icon: props.icon?.value,
                    title: props.title?.(item)?.value,
                    eventDateTime: props.timeIndication?.(item)?.value,
                    description: props.description?.(item)?.value,
                    action: props.onClick?.(item)
                };
            } else {
                groupKey = getGroupHeaderByType(groupAttribute?.formatter, props.groupByKey, date);
                constructedItem = {
                    icon: props.customIcon?.(item),
                    groupHeader: props.customGroupHeader?.(item),
                    title: props.customTitle?.(item),
                    eventDateTime: props.customEventDateTime?.(item),
                    description: props.customDescription?.(item),
                    action: props.onClick?.(item)
                };
            }

            const currentDates = eventsMap.get(groupKey);
            if (currentDates) {
                currentDates.push(constructedItem);
            } else {
                eventsMap.set(groupKey, [constructedItem]);
            }
        });

        return eventsMap;
    }, [props.data]);

    return (
        <TimelineComponent
            name={props.name}
            data={groupedEvents}
            groupEvents={props.groupEvents}
            customVisualization={props.customVisualization}
            ungroupedEventsPosition={props.ungroupedEventsPosition}
        />
    );
}
