import { createElement, ReactElement } from "react";
import { hot } from "react-hot-loader/root";

import { Fieldset as FieldsetComponent } from "./components/Fieldset";
import { FieldsetContainerProps } from "../typings/FieldsetProps";

function Fieldset(props: FieldsetContainerProps): ReactElement {
    const { legend, content, name, tabIndex, style, class: className } = props;

    return (
        <FieldsetComponent name={name} tabIndex={tabIndex} style={style} className={className} legend={legend?.value}>
            {content}
        </FieldsetComponent>
    );
}

export default hot(Fieldset);
