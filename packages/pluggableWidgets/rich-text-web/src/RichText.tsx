import { ReactNode, createElement } from "react";
import { RichText as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";

export default function RichText(props: RichTextContainerProps): ReactNode {
    return <RichTextComponent {...props} />;
}
