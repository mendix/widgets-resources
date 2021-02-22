import { createElement, ReactElement } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterContainerProps } from "../typings/DatagridDateFilterProps";
import { registerLocale } from "react-datepicker";
import * as locales from "date-fns/locale";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@widgets-resources/piw-utils";

interface Locale {
    [key: string]: object;
}

export default function DatagridDateFilter(props: DatagridDateFilterContainerProps): ReactElement | null {
    const FilterContext = getFilterDispatcher();

    const { languageTag = "en-US", patterns } = (window as any).mx.session.getConfig().locale;

    const [language] = languageTag.split("-");
    const languageTagWithoutDash = languageTag.replace("-", "");

    if (languageTagWithoutDash in locales) {
        registerLocale(language, (locales as Locale)[languageTagWithoutDash]);
    } else if (language in locales) {
        registerLocale(language, (locales as Locale)[language]);
    }

    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The data grid date filter widget must be placed inside the header of the Data grid 2.0 widget.
        </Alert>
    );

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterDispatcher =>
                filterDispatcher ? (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={props.defaultFilter}
                        defaultValue={props.defaultValue?.value}
                        dateFormat={patterns.date}
                        filterDispatcher={filterDispatcher}
                        locale={language}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                    />
                ) : (
                    alertMessage
                )
            }
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}
