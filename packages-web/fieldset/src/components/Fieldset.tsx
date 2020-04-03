import { createElement, CSSProperties, FunctionComponent } from "react";

export interface FieldsetProps {
    name?: string;
    className: string;
    style?: CSSProperties;
    tabIndex?: number;
    legend?: string;
}

export const Fieldset: FunctionComponent<FieldsetProps> = (props): JSX.Element | null => {
    const { legend, name, tabIndex, style, className, children } = props;

    if (!children) {
        return null;
    }

    return (
        <fieldset name={name} tabIndex={tabIndex} style={style} className={className}>
            {legend && <legend>{legend}</legend>}
            {children}
        </fieldset>
    );
};
