import { createElement, ReactElement } from "react";

import "./ui/DatagridDateFilter.scss";
import { FilterComponent } from "./components/FilterComponent";
import { useFilterDispatcher } from "./utils/provider";
import { DatagridDateFilterContainerProps } from "../typings/DatagridDateFilterProps";
import { registerLocale } from "react-datepicker";
import * as locales from "date-fns/locale";

declare type window = {
    mx: {
        session: {
            getConfig: () => {
                locale: {
                    languageTag: string;
                    patterns: {
                        date: string;
                    };
                };
            };
        };
    };
};

interface Locale {
    [key: string]: object;
}

declare let window: window;
const { languageTag = "en-US", patterns } = window.mx.session.getConfig().locale;

export default function DatagridDateFilter(props: DatagridDateFilterContainerProps): ReactElement {
    const filterDispatcher = useFilterDispatcher();

    const [language] = languageTag.split("-");
    const languageTagWithoutDash = languageTag.replace("-", "");

    if (languageTagWithoutDash in locales) {
        registerLocale(language, (locales as Locale)[languageTagWithoutDash]);
    } else if (language in locales) {
        registerLocale(language, (locales as Locale)[language]);
    }

    return (
        <FilterComponent
            adjustable={props.adjustable}
            defaultFilter={props.defaultFilter}
            dateFormat={patterns.date}
            filterDispatcher={filterDispatcher}
            locale={language}
            name={props.name}
            placeholder={props.placeholder?.value}
            screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
            screenReaderInputCaption={props.screenReaderInputCaption?.value}
            tabIndex={props.tabIndex}
            defaultValue={props.defaultValue?.value}
        />
    );
}
