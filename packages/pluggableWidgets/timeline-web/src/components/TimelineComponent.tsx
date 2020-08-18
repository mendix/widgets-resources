import { RenderModeEnum } from "../../typings/TimelineProps";
import { Children, createElement, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { BasicItemType, CustomItemType, ItemType } from "../Timeline";
import { Icon } from "mendix/components/web/Icon";

export interface TimelineComponentProps {
    data: Map<string | ReactNode, ItemType[]>;
    renderMode: RenderModeEnum;
    showGroupDivider: boolean;
}

export default function TimelineComponent(props: TimelineComponentProps): ReactElement {
    return <div className="timeline-wrapper">{getItems(props.data, props.renderMode, props.showGroupDivider)}</div>;
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

function getCustomEventsFromDay(eventsOfDay: CustomItemType[]): { groupDivider: ReactNode; events: ReactNode[] } {
    let groupDivider: ReactNode = null;
    const events = eventsOfDay.map((event, index) => {
        groupDivider = event.groupDivider;
        return (
            <li className="timeline-event" key={index}>
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
    return { groupDivider, events };
}

export function getItems(
    structuredEvents: Map<string | ReactNode, ItemType[]>,
    renderMode: RenderModeEnum,
    showGroupDivider: boolean
): ReactNode[] {
    const days: ReactNode[] = [];
    structuredEvents.forEach((eventsOfDay: ItemType[], groupKey: string) => {
        let events;
        let groupDivider;
        if (renderMode === "basic") {
            events = getBasicEventsFromDay(eventsOfDay as BasicItemType[]);
            groupDivider = <span>{groupKey}</span>;
        } else {
            events = getCustomEventsFromDay(eventsOfDay).events;
            groupDivider = getCustomEventsFromDay(eventsOfDay).groupDivider;
        }

        const constructedDiv = (
            <div className="timeline-date" key={groupKey}>
                {showGroupDivider && hasChildren(groupDivider) && (
                    <div className="timeline-date-header">{groupDivider}</div>
                )}
                <div className={classNames("timeline-events", !showGroupDivider ? "no-divider" : undefined)}>
                    <ul>{events}</ul>
                </div>
            </div>
        );
        days.push(constructedDiv);
    });
    return days;
}

function hasChildren(element: any): boolean {
    return Children.count((element as ReactElement)?.props.children) > 0;
}
