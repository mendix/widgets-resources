import { createElement, CSSProperties, PropsWithChildren, ReactElement } from "react";

export interface FieldsetProps {
    name?: string;
    className: string;
    style?: CSSProperties;
    tabIndex?: number;
    legend?: string;
}

export function Fieldset(props: PropsWithChildren<FieldsetProps>): ReactElement {
    const { legend, name, tabIndex, style, className, children } = props;

    return (
        <fieldset name={name} tabIndex={tabIndex} style={style} className={className}>
            {legend && <legend>{legend}</legend>}
            {children}
        </fieldset>
    );
}
