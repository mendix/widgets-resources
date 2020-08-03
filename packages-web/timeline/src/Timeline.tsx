import { createElement, ReactNode, useMemo } from "react";
import { TimelineContainerProps } from "../typings/TimelineProps";
import "./ui/Timeline.scss";
import { DynamicValue, WebImage } from "mendix";
import classNames from "classnames";

interface BasicItemType {
    icon?: DynamicValue<WebImage>;
    title?: string;
    date?: string;
    time?: string;
    description?: string;
}

interface CustomItemType {
    icon?: ReactNode;
    dayDivider?: ReactNode;
    title?: ReactNode;
    eventDateTime?: ReactNode;
    description?: ReactNode;
}

type ItemType = BasicItemType | CustomItemType;

export default function Timeline(props: TimelineContainerProps): ReactNode {
    const getStructuredEvents = useMemo(() => {
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
                    icon: props.customIcon,
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

    function getBasicEventsFromDay(eventsOfDay: BasicItemType[]): ReactNode[] {
        return eventsOfDay.map((event, index) => (
            <li className="timeline-event" key={index}>
                <div className="icon-wrapper">
                    {event.icon?.value?.uri ? (
                        <img alt={event.icon.value.altText} src={event.icon?.value?.uri} className="timeline-icon" />
                    ) : (
                        <div className="timeline-icon circle" />
                    )}
                </div>
                <div className="flex-container content-wrapper">
                    <div className="date-time-wrapper">
                        <p>{event.time}</p>
                    </div>
                    <div className="flex-container info-wrapper">
                        <p className="title">{event.title}</p>
                        <p className="description">{event.description}</p>
                    </div>
                </div>
            </li>
        ));
    }

    function getCustomEventsFromDay(
        eventsOfDay: CustomItemType[]
    ): { eventDayDivider: ReactNode; events: ReactNode[] } {
        let eventDayDivider: ReactNode = null;
        const events = eventsOfDay.map((event, index) => {
            if (index === 0) {
                eventDayDivider = event.dayDivider;
            }
            return (
                <li className="timeline-event" key={index}>
                    <div className="icon-wrapper">{event.icon ?? <div className="timeline-icon circle" />}</div>

                    <div className="flexcontainer content-wrapper">
                        {event.eventDateTime && <div className="date-time-wrapper">{event.eventDateTime}</div>}
                        <div className="flexcontainer info-wrapper">
                            {event.title}
                            {event.description}
                        </div>
                    </div>
                </li>
            );
        });
        return { eventDayDivider, events };
    }

    function getItems(): ReactNode[] {
        const days: ReactNode[] = [];
        getStructuredEvents.forEach((eventsOfDay: ItemType[], day: string) => {
            let events;
            let dayDivider;
            if (props.renderMode === "basic") {
                events = getBasicEventsFromDay(eventsOfDay as BasicItemType[]);
                dayDivider = <span>{day}</span>;
            } else {
                events = getCustomEventsFromDay(eventsOfDay).events;
                dayDivider = getCustomEventsFromDay(eventsOfDay).eventDayDivider;
            }

            const constructedDiv = (
                <div className="timeline-date">
                    {props.showDayDivider && <div className="timeline-date-header">{dayDivider}</div>}
                    <div className={classNames("timeline-events", !props.showDayDivider ? "no-divider" : undefined)}>
                        <ul>{events}</ul>
                    </div>
                </div>
            );
            days.push(constructedDiv);
        });
        return days;
    }
    return <div className="timeline-wrapper">{getItems()}</div>;
}
