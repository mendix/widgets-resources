import { createElement, ReactElement } from "react";

import { Fieldset } from "./components/Fieldset";
import { FieldsetPreviewProps } from "../typings/FieldsetProps";

// declare function require(name: string): string;

export const preview = (props: FieldsetPreviewProps): ReactElement => {
    const { class: className, styleObject, legend, content } = props;

    return (
        <Fieldset className={className} style={styleObject} legend={legend}>
            {content}
        </Fieldset>
    );
};

// export function getPreviewCss(): string {
//     return require("./ui/BadgeButton.css");
// }
