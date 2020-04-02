import { createElement, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

import { Fieldset as FieldsetComponent } from "./components/Fieldset";
import { FieldsetContainerProps } from "../typings/FieldsetProps";

export const Fieldset = (props: FieldsetContainerProps): ReactNode => {
    const { legend, content, name, tabIndex, style, class: className } = props;

    return (
        <FieldsetComponent name={name} tabIndex={tabIndex} style={style} className={className} legend={legend?.value}>
            {content}
        </FieldsetComponent>
    );
};

export default hot(Fieldset);
