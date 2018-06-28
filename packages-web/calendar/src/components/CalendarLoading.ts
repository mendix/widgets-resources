import { ReactElement, SFC, createElement } from "react";
import "../ui/CalendarLoading.scss";

export const CalendarLoading: SFC = () =>
    createElement("div", { className: "widget-calendar-loading-wrapper" },
        createElement("div", { className: "widget-calendar-loading-indicator" },
            ...generateDivs(12)
        )
    );

export const generateDivs = (amount: number) => {
    const divs: ReactElement<any>[] = [];
    for (let i = 0; i < amount; i++) {
        divs.push(createElement("div"));
    }

    return divs;
};

CalendarLoading.displayName = "CalendarLoading";
