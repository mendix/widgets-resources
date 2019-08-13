import { MutationObserver } from "./polyfills/mutation-observer";
import { ShallowWrapper, mount, shallow, ReactWrapper } from "enzyme";
import { createElement } from "react";

import { RichText, RichTextProps } from "../RichText";

Object.defineProperty(window, "MutationObserver", { value: MutationObserver });
Object.defineProperty(document, "getSelection", { value: jest.fn() });

describe("RichText", () => {
    const shallowRenderTextEditor = (props: RichTextProps): ShallowWrapper<RichTextProps, any> =>
        shallow(createElement(RichText, props));
    const fullRenderTextEditor = (props: RichTextProps): ReactWrapper<RichTextProps, any> =>
        mount(createElement(RichText, props));
    let textEditor: ShallowWrapper<RichTextProps, any>;
    const defaultProps: RichTextProps = {
        customOptions: [],
        editorOption: "basic",
        maxNumberOfLines: 10,
        minNumberOfLines: 10,
        translatable: false,
        sanitizeContent: false,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        readOnly: false,
        readOnlyStyle: "bordered",
        theme: "snow",
        value: "<p>Rich Text</p>"
    };

    describe("that is not read-only", () => {
        it("renders the structure correctly", () => {
            textEditor = shallowRenderTextEditor(defaultProps);
            expect(textEditor).toMatchSnapshot();
        });

        it("renders a quill editor", () => {
            textEditor = shallowRenderTextEditor(defaultProps);
            const textEditorInstance = textEditor.instance() as any;
            textEditorInstance.quillNode = document.createElement("div");
            document.createElement("div").appendChild(textEditorInstance.quillNode);

            const editorSpy = spyOn(textEditorInstance, "setUpEditor").and.callThrough();
            textEditorInstance.componentDidMount();

            expect(editorSpy).toHaveBeenCalled();
        });

        it("updates when the editor value changes", () => {
            textEditor = shallowRenderTextEditor(defaultProps); // extract into a beforeEach
            const textEditorInstance = textEditor.instance() as any;
            textEditorInstance.quillNode = document.createElement("div");
            document.createElement("div").appendChild(textEditorInstance.quillNode);

            const editorSpy = spyOn(textEditorInstance, "updateEditor").and.callThrough();
            textEditorInstance.componentDidUpdate(defaultProps);
            textEditorInstance.componentDidMount();
            textEditorInstance.componentDidUpdate({ ...defaultProps, value: "New value" });

            expect(editorSpy).toHaveBeenCalledTimes(1);
        });

        it("renders a quill editor with an alert message", () => {
            const richTextProps: RichTextProps = {
                ...defaultProps,
                alertMessage: "Error message",
                readOnly: false,
                translatable: true
            };

            textEditor = shallowRenderTextEditor(richTextProps);
            expect(textEditor).toMatchSnapshot();
        });

        describe("with editor mode set to", () => {
            const getToolBar: any = (props: RichTextProps) => {
                textEditor = shallowRenderTextEditor(props);
                const textEditorInstance = textEditor.instance() as any;
                const quillNode = (textEditorInstance.quillNode = document.createElement("div"));
                document.createElement("div").appendChild(quillNode);
                textEditorInstance.componentDidMount();

                return textEditorInstance.quill.getModule("toolbar");
            };

            it("basic renders a basic text editor", () => {
                const toolbar = getToolBar(defaultProps);

                expect(toolbar.options.container).toHaveLength(2);
            });

            it("extended renders an extended text editor", () => {
                const toolbar = getToolBar({ ...defaultProps, editorOption: "extended" });

                expect(toolbar.options.container).toHaveLength(6);
            });

            it("custom renders a custom toolbar", () => {
                const toolbar = getToolBar({
                    ...defaultProps,
                    editorOption: "custom",
                    customOptions: [{ option: "bold" }, { option: "spacer" }, { option: "underline" }]
                });

                expect(toolbar.options.container).toHaveLength(2);
            });
        });
    });
    // TODO: Add tests for invalid HTML and for sanitized HTML
    describe("that is read-only", () => {
        it("with read-only style text renders the structure correctly", () => {
            textEditor = shallowRenderTextEditor({ ...defaultProps, readOnly: true, readOnlyStyle: "text" });
            expect(textEditor).toMatchSnapshot();
        });

        it("with read-only style bordered has the disabled-bordered class", () => {
            textEditor = shallowRenderTextEditor({ ...defaultProps, readOnly: true, readOnlyStyle: "bordered" });

            expect(textEditor.hasClass("disabled-bordered")).toBe(true);
        });

        it("with read-only style borderedToolbar has the disabled-bordered-toolbar class", () => {
            textEditor = shallowRenderTextEditor({ ...defaultProps, readOnly: true, readOnlyStyle: "borderedToolbar" });

            expect(textEditor.hasClass("disabled-bordered-toolbar")).toBe(true);
        });
    });

    it("destroys and recreates the editor on update when configured to recreate", () => {
        const richText = fullRenderTextEditor({ ...defaultProps, recreate: true });
        const richTextInstance = richText.instance() as any;
        const editorSpy = spyOn(richTextInstance, "setUpEditor").and.callThrough();

        richTextInstance.componentDidUpdate();
        expect(editorSpy).toHaveBeenCalled();
    });

    describe("whose read-only status changes from true to false", () => {
        it("and read-only style is not text sets up the editor afresh", () => {
            const richText = fullRenderTextEditor({ ...defaultProps, readOnly: true });
            const editorSpy = spyOn(richText.instance() as any, "setUpEditor").and.callThrough();

            richText.setProps({ readOnly: false });
            expect(editorSpy).toHaveBeenCalled();
        });
    });
});
