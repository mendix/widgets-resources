import { ReactElement, createElement, FunctionComponent } from "react";
import "../ui/CalendarLoader.scss";

export const CalendarLoader: FunctionComponent = () =>
    createElement(
        "div",
        { className: "widget-calendar-loading-wrapper" },
        createElement("div", { className: "widget-calendar-loading-indicator" }, ...generateDivs(12))
    );

export const generateDivs = (amount: number): Array<ReactElement<any>> => {
    const divs: Array<ReactElement<any>> = [];
    for (let i = 0; i < amount; i++) {
        divs.push(createElement("div"));
    }

    return divs;
};

CalendarLoader.displayName = "CalendarLoading";
