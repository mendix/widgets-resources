import { createElement, ReactElement, useCallback } from "react";
import ReactAceEditor, { IAceEditorProps, IMarker } from "react-ace";
import { compare, Operation } from "fast-json-patch";
import * as jsonSourceMap from "json-source-map";

import "ace-builds/src-min-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

interface CodeEditorProps {
    onChange?: IAceEditorProps["onChange"];
    onValidate?: IAceEditorProps["onValidate"];
    overwriteValue?: string;
    readOnly?: IAceEditorProps["readOnly"];
    value: string;
}

export const CodeEditor = ({
    readOnly,
    value,
    onChange,
    onValidate,
    overwriteValue
}: CodeEditorProps): ReactElement => {
    const onChangeWithoutTrailingNewLine = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(removeTrailingNewLine(value));
            }
        },
        [onChange]
    );

    return (
        <ReactAceEditor
            className={readOnly ? "ace-editor-read-only" : undefined}
            editorProps={{ $blockScrolling: Infinity }}
            mode="json"
            markers={overwriteValue ? getMarkers(value, overwriteValue) : undefined}
            maxLines={1000} // crappy attempt to avoid a third scroll bar
            onChange={onChange ? onChangeWithoutTrailingNewLine : undefined}
            onValidate={onValidate}
            readOnly={readOnly}
            setOptions={{
                showLineNumbers: false,
                highlightActiveLine: false,
                highlightGutterLine: true
            }}
            theme="github"
            value={`${value}\n`}
            width="100%"
        />
    );
};

function removeTrailingNewLine(value: string): string {
    const splitValue = value.split("\n");
    if (splitValue[splitValue.length - 1] === "") {
        splitValue.pop();
    }

    return splitValue.join("\n");
}

function getMarkers(left: string, right?: string): IMarker[] {
    const markers: IMarker[] = [];
    if (right) {
        const diffs = compare(JSON.parse(left), JSON.parse(right));
        diffs.forEach(diff => {
            if (diff.op === "replace") {
                const pos = getStartAndEndPosOfDiff(left, diff);
                if (pos) {
                    markers.push(pos);
                }
            }
        });
    }

    return markers;
}

function getStartAndEndPosOfDiff(textValue: string, diff: Operation): IMarker | null {
    const result = jsonSourceMap.parse(textValue);
    const pointer = result.pointers[diff.path];
    if (pointer && pointer.key && pointer.valueEnd) {
        return {
            startRow: pointer.key.line,
            startCol: pointer.key.column,
            endRow: pointer.valueEnd.line,
            endCol: pointer.valueEnd.column,
            type: "text",
            className: "replaced-config"
        };
    }

    return null;
}
