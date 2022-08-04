import { createElement, ReactElement } from "react";
import { LanguageSelectorPreviewProps } from "typings/LanguageSelectorProps";

export const preview = (__props: LanguageSelectorPreviewProps): ReactElement => {
    return <div>Hello</div>;
};

// export function getPreviewCss(): string {
//     return require("./ui/Tooltip.scss");
// }
