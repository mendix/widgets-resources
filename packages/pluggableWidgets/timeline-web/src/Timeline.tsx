import { createElement, ReactElement, ReactNode, useMemo } from "react";
import { TimelineContainerProps } from "../typings/TimelineProps";
import "./ui/Timeline.scss";
import { DynamicValue, WebIcon } from "mendix";
import TimelineComponent from "./components/TimelineComponent";

export interface BasicItemType {
    icon?: DynamicValue<WebIcon>;
    title?: string;
    time?: string;
    description?: string;
}

export interface CustomItemType {
    icon?: ReactNode;
    groupDivider?: ReactNode;
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
            let monthFormatter = eventTime.formatter;
            let yearFormatter = eventTime.formatter;
            let timeFormatter = eventTime.formatter;

            if (dateFormatter?.type === "datetime") {
                dateFormatter = dateFormatter.withConfig({ type: "date" });
                monthFormatter = dateFormatter.withConfig({ type: "custom", pattern: "MMM" });
                yearFormatter = dateFormatter.withConfig({ type: "custom", pattern: "YYYY" });
                timeFormatter = dateFormatter.withConfig({ type: "time" });
            }

            if (props.renderMode === "basic") {
                constructedItem = {
                    icon: props.icon,
                    title: props.title?.(item).displayValue,
                    time: timeFormatter?.format(eventTime.value),
                    description: props.description?.(item).displayValue
                };
            } else {
                constructedItem = {
                    icon: props.customIcon?.(item),
                    groupDivider: props.customGroupDivider?.(item),
                    title: props.customTitle?.(item),
                    eventDateTime: props.customEventDateTime?.(item),
                    description: props.customDescription?.(item)
                };
            }

            let groupKey: string;
            switch (props.groupByKey) {
                case "month":
                    groupKey = `${monthFormatter.format(eventTime.value)} / ${yearFormatter.format(eventTime.value)}`;
                    break;
                case "year":
                    groupKey = yearFormatter.format(eventTime.value);
                    break;
                default:
                    groupKey = dateFormatter?.format(eventTime.value);
                    break;
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
            data={structuredEvents}
            showGroupDivider={props.showGroupDivider}
            renderMode={props.renderMode}
        />
    );
}
