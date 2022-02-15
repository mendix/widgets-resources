import { ReactNode, createElement, useMemo, useRef, useCallback } from "react";
import { RichTextEditor as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";
import { debounce, executeAction } from "@mendix/piw-utils-internal";
import loadingCircleSvg from "./ui/loading-circle.svg";
import "./ui/RichText.scss";
import { useEditorSettings } from "./utils/useEditorSettings";

export default function RichText(props: RichTextContainerProps): ReactNode {
    const [editorSettings, editorKey] = useEditorSettings(props);
    const attributeRef = useRef(props.stringAttribute);
    attributeRef.current = props.stringAttribute;

    const onChange = useMemo(() => {
        return debounce((value: string) => {
            attributeRef.current.setValue(value);
            if (props.onChange) {
                executeAction(props.onChange);
            }
        }, 500);
    }, [props.onChange, attributeRef]);

    const onKeyPress = useCallback(() => executeAction(props.onKeyPress), [props.onKeyPress]);

    if (props.stringAttribute.status !== "available") {
        return <img src={loadingCircleSvg} className="widget-rich-text-loading-spinner" alt="" aria-hidden />;
    }

    return (
        <RichTextComponent
            key={editorKey}
            onChange={onChange}
            onKeyPress={onKeyPress}
            readOnlyStyle={props.stringAttribute.readOnly ? props.readOnlyStyle : undefined}
            editorSettings={editorSettings}
            value={props.stringAttribute.value ?? ""}
        />
    );
}
