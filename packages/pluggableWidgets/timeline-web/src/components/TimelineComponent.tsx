import { RenderModeEnum } from "../../typings/TimelineProps";
import { Children, createElement, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { BasicItemType, CustomItemType, ItemType } from "../Timeline";
import { Icon } from "mendix/components/web/Icon";
import { ActionValue } from "mendix";

export interface TimelineComponentProps {
    data: Map<string, ItemType[]>;
    renderMode: RenderModeEnum;
    showGroupDivider: boolean;
    onPress?: ActionValue;
}

export default function TimelineComponent(props: TimelineComponentProps): ReactElement {
    return <div className="timeline-wrapper">{getItems(props.data, props.renderMode, props.showGroupDivider)}</div>;
}

export function getItems(
    structuredEvents: Map<string, ItemType[]>,
    renderMode: RenderModeEnum,
    showGroupDivider: boolean
): ReactNode[] {
    const days: ReactNode[] = [];
    structuredEvents.forEach((eventsOfDay: ItemType[], groupKey: string) => {
        let events;
        let groupDivider: ReactNode = <span>{groupKey}</span>;

        if (renderMode === "basic") {
            events = getBasicEventsFromDay(eventsOfDay as BasicItemType[]);
        } else {
            events = getCustomEventsFromDay(eventsOfDay as CustomItemType[]);
            const firstEvent = eventsOfDay[0] as CustomItemType;
            if ((eventsOfDay[0] as CustomItemType)?.groupDivider) {
                groupDivider = firstEvent.groupDivider;
            }
        }

        const constructedDiv = (
            <div className="timeline-date" key={groupKey}>
                {showGroupDivider && <div className="timeline-date-header">{groupDivider}</div>}
                <div className={classNames("timeline-events", !showGroupDivider ? "no-divider" : undefined)}>
                    <ul>{events}</ul>
                </div>
            </div>
        );
        days.push(constructedDiv);
    });
    return days;
}

function getBasicEventsFromDay(eventsOfDay: BasicItemType[]): ReactNode[] {
    return eventsOfDay.map((event, index) => (
        <li
            key={index}
            onClick={() => event.action}
            className={classNames("timeline-event", event.action ? "clickable" : undefined)}
        >
            <div className="icon-wrapper">
                {event.icon?.value ? <Icon icon={event.icon.value} /> : <div className="timeline-icon-circle" />}
            </div>
            <div className="flex-container content-wrapper">
                <div className="date-time-wrapper">
                    <p>{event.eventDateTime}</p>
                </div>
                <div className="flex-container info-wrapper">
                    <p className="title">{event.title}</p>
                    <p className="description">{event.description}</p>
                </div>
            </div>
        </li>
    ));
}

function getCustomEventsFromDay(eventsOfDay: CustomItemType[]) {
    return eventsOfDay.map((event, index) => {
        return (
            <li
                key={index}
                onClick={() => event.action}
                className={classNames("timeline-event", event.action ? "clickable" : undefined)}
            >
                <div className="icon-wrapper">
                    {hasChildren(event.icon) ? event.icon : <div className="timeline-icon-circle" />}
                </div>
                <div className="flexcontainer content-wrapper">
                    {hasChildren(event.eventDateTime) && <div className="date-time-wrapper">{event.eventDateTime}</div>}
                    <div className="flexcontainer info-wrapper">
                        {event.title}
                        {event.description}
                    </div>
                </div>
            </li>
        );
    });
}

function hasChildren(element: any): boolean {
    return Children.count((element as ReactElement)?.props.children) > 0;
}
