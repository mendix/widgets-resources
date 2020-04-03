import { createElement, ReactElement, ComponentType } from "react";

import { Fieldset } from "./components/Fieldset";
import { FieldsetPreviewProps } from "../typings/FieldsetProps";

declare function require(name: string): string;

// Temporary interface to fix incorrect widgets property typing for preview ("renderer: ReactNode" should be "renderer: ComponentType")
interface PreviewProps extends FieldsetPreviewProps {
    content: {
        widgetCount: number;
        renderer: ComponentType;
    };
}

export const preview = (props: PreviewProps): ReactElement => {
    const { class: className, styleObject, legend, content } = props;

    const ContentRenderer = content.renderer;

    return (
        <Fieldset className={className} style={styleObject} legend={legend}>
            <ContentRenderer>
                <div />
            </ContentRenderer>
        </Fieldset>
    );
};

export function getPreviewCss(): string {
    return require("./ui/Fieldset.editorPreview.css");
}
