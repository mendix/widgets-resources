import { createElement, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

import { FieldsetContainerProps } from "../typings/FieldsetProps";

const Fieldset = (props: FieldsetContainerProps): ReactNode => {
    const { legend, content, name, tabIndex, style, class: className } = props;

    return (
        <fieldset name={name} tabIndex={tabIndex} style={style} className={className}>
            {legend?.value && <legend>{legend.value}</legend>}
            {content}
        </fieldset>
    );
};

export default hot(Fieldset);
