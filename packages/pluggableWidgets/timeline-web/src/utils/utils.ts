import { TimelineContainerProps } from "../../typings/TimelineProps";

export type GroupHeaderConfig = Pick<
    TimelineContainerProps,
    "groupByKey" | "groupByDayOptions" | "groupByMonthOptions"
>;

export function getHeaderOption({ groupByKey, groupByDayOptions, groupByMonthOptions }: GroupHeaderConfig) {
    return groupByKey === "day" ? groupByDayOptions : groupByKey === "month" ? groupByMonthOptions : "year";
}
