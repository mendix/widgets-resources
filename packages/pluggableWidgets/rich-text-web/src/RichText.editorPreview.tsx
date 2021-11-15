import { createElement, ReactElement } from "react";
import { RichText } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";

export const preview = (props: RichTextContainerProps): ReactElement => {
    return <RichText {...props} />;
};
