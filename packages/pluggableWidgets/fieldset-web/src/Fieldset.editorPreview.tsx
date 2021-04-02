import { createElement, ReactElement } from "react";
import { parseStyle } from "@mendix/piw-utils-internal";

import { Fieldset } from "./components/Fieldset";
import { FieldsetPreviewProps } from "../typings/FieldsetProps";

export function preview(props: FieldsetPreviewProps): ReactElement {
    const { class: className, legend } = props;
    const style = parseStyle(props.style);
    const ContentRenderer = props.content.renderer;

    return (
        <Fieldset className={className} style={style} legend={legend}>
            <ContentRenderer>
                <div />
            </ContentRenderer>
        </Fieldset>
    );
}
