import { RenderModeEnum } from "../../typings/TimelineProps";
import { Children, createElement, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { BasicItemType, CustomItemType, ItemType } from "../Timeline";
import { Icon } from "mendix/components/web/Icon";

export interface TimelineComponentProps {
    data: Map<string | ReactNode, ItemType[]>;
    renderMode: RenderModeEnum;
    showDayDivider: boolean;
}

export default function TimelineComponent(props: TimelineComponentProps): ReactElement {
    return <div className="timeline-wrapper">{getItems(props.data, props.renderMode, props.showDayDivider)}</div>;
}

function getBasicEventsFromDay(eventsOfDay: BasicItemType[]): ReactNode[] {
    return eventsOfDay.map((event, index) => (
        <li className="timeline-event" key={index}>
            <div className="icon-wrapper">
                {event.icon?.value ? <Icon icon={event.icon.value} /> : <div className="timeline-icon-circle" />}
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

function getCustomEventsFromDay(eventsOfDay: CustomItemType[]): { eventDayDivider: ReactNode; events: ReactNode[] } {
    let eventDayDivider: ReactNode = null;
    const events = eventsOfDay.map((event, index) => {
        eventDayDivider = event.dayDivider;
        return (
            <li className="timeline-event" key={index}>
                <div className="icon-wrapper">{event.icon ?? <div className="timeline-icon-circle" />}</div>
                <div className="flexcontainer content-wrapper">
                    {Children.count((event.eventDateTime as ReactElement).props.children) > 0 && (
                        <div className="date-time-wrapper">{event.eventDateTime}</div>
                    )}
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

export function getItems(
    structuredEvents: Map<string | ReactNode, ItemType[]>,
    renderMode: RenderModeEnum,
    showDayDivider: boolean
): ReactNode[] {
    const days: ReactNode[] = [];
    structuredEvents.forEach((eventsOfDay: ItemType[], day: string) => {
        let events;
        let dayDivider;
        if (renderMode === "basic") {
            events = getBasicEventsFromDay(eventsOfDay as BasicItemType[]);
            dayDivider = <span>{day}</span>;
        } else {
            events = getCustomEventsFromDay(eventsOfDay).events;
            dayDivider = getCustomEventsFromDay(eventsOfDay).eventDayDivider;
        }

        const constructedDiv = (
            <div className="timeline-date" key={day}>
                {showDayDivider && Children.count((dayDivider as ReactElement).props.children) > 0 && (
                    <div className="timeline-date-header">{dayDivider}</div>
                )}
                <div className={classNames("timeline-events", !showDayDivider ? "no-divider" : undefined)}>
                    <ul>{events}</ul>
                </div>
            </div>
        );
        days.push(constructedDiv);
    });
    return days;
}
