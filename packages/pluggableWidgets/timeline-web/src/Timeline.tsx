import { createElement, ReactElement, ReactNode, useMemo } from "react";
import { TimelineContainerProps } from "../typings/TimelineProps";
import "./ui/Timeline.scss";
import { ActionValue, WebIcon } from "mendix";
import TimelineComponent, { getGroupHeaderByType } from "./components/TimelineComponent";

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
            const eventTime = props.eventTime?.(item);
            const date = eventTime?.value;
            let groupKey;

            if (props.renderMode === "basic") {
                const headerOption =
                    props.groupByKey === "day"
                        ? props.groupByDayOptions
                        : props.groupByKey === "month"
                        ? props.groupByMonthOptions
                        : "year";

                groupKey = getGroupHeaderByType(eventTime?.formatter, headerOption, date);
                constructedItem = {
                    icon: props.icon?.value,
                    title: props.title?.(item)?.displayValue,
                    eventDateTime: props.time?.(item)?.value,
                    description: props.description?.(item)?.displayValue,
                    action: props.onClick?.(item)
                };
            } else {
                groupKey = getGroupHeaderByType(eventTime?.formatter, props.groupByKey, date);
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
            showGroupHeader={props.showGroupHeader}
            renderMode={props.renderMode}
            eventOrder={props.eventOrder}
        />
    );
}
