import { ShallowWrapper, mount, shallow } from "enzyme";
import { createElement } from "react";

import { RichText, RichTextProps } from "../RichText";

describe("RichText", () => {
    const shallowRenderTextEditor = (props: RichTextProps) => shallow(createElement(RichText, props));
    const fullRenderTextEditor = (props: RichTextProps) => mount(createElement(RichText, props));
    let textEditor: ShallowWrapper<RichTextProps, any>;
    const defaultProps: RichTextProps = {
        customOptions: [],
        editorOption: "basic",
        maxNumberOfLines: 10,
        minNumberOfLines: 10,
        onChange: jasmine.any(Function),
        onBlur: jasmine.any(Function),
        readOnly: false,
        readOnlyStyle: "bordered",
        theme: "snow",
        value: "<p>Rich Text</p>"
    };

    describe("that is not read-only", () => {
        it("renders the structure correctly", () => {
            textEditor = shallowRenderTextEditor(defaultProps);

            expect(textEditor).toBeElement(
                createElement("div", { className: "widget-rich-text disabled-bordered" },
                    createElement("div", { className: "widget-rich-text-quill" })
                )
            );
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
            defaultProps.value = "New value";
            textEditorInstance.componentDidUpdate(defaultProps);

            expect(editorSpy).toHaveBeenCalledTimes(1);
        });

        describe("with editor mode set to", () => {
            const getToolBar: any = (props: RichTextProps) => {
                textEditor = shallowRenderTextEditor(props);
                const textEditorInstance = textEditor.instance() as any;
                const quillNode = textEditorInstance.quillNode = document.createElement("div");
                document.createElement("div").appendChild(quillNode);
                textEditorInstance.componentDidMount();

                return textEditorInstance.quill.getModule("toolbar");
            };

            it("basic renders a basic text editor", () => {
                const toolbar = getToolBar(defaultProps);

                expect(toolbar.options.container.length).toBe(2);
            });

            it("extended renders an extended text editor", () => {
                defaultProps.editorOption = "extended";
                const toolbar = getToolBar(defaultProps);

                expect(toolbar.options.container.length).toBe(6);
            });

            it("custom renders a custom toolbar", () => {
                defaultProps.editorOption = "custom";
                defaultProps.customOptions = [ { option: "bold" }, { option: "spacer" }, { option: "underline" } ];
                const toolbar = getToolBar(defaultProps);

                expect(toolbar.options.container.length).toBe(2);
            });
        });
    });
    // TODO: Add tests for invalid HTML and for sanitized HTML
    describe("that is read-only", () => {
        defaultProps.readOnly = true;

        it("with read-only style text renders the structure correctly", () => {
            defaultProps.readOnlyStyle = "text";
            textEditor = shallowRenderTextEditor(defaultProps);

            expect(textEditor).toBeElement(
                createElement("div", {
                    className: "widget-rich-text disabled-text",
                    dangerouslySetInnerHTML: { __html: defaultProps.value }
                })
            );
        });

        it("with read-only style bordered has the disabled-bordered class", () => {
            defaultProps.readOnlyStyle = "bordered";
            textEditor = shallowRenderTextEditor(defaultProps);

            expect(textEditor).toHaveClass("disabled-bordered");
        });

        it("with read-only style borderedToolbar has the disabled-bordered-toolbar class", () => {
            defaultProps.readOnlyStyle = "borderedToolbar";
            textEditor = shallowRenderTextEditor(defaultProps);

            expect(textEditor).toHaveClass("disabled-bordered-toolbar");
        });
    });

    it("destroys and recreates the editor on update when configured to recreate", () => {
        defaultProps.recreate = true;
        const richText = fullRenderTextEditor(defaultProps);
        const editorSpy = spyOn(richText.instance() as any, "setUpEditor").and.callThrough();

        richText.update();
        expect(editorSpy).toHaveBeenCalled();
    });

    describe("whose read-only status changes from true to false", () => {
        it("and read-only style is not text sets up the editor afresh", () => {
            defaultProps.readOnly = true;
            const richText = fullRenderTextEditor(defaultProps);
            const editorSpy = spyOn(richText.instance() as any, "setUpEditor").and.callThrough();

            richText.setProps({ readOnly: false });
            expect(editorSpy).toHaveBeenCalled();
        });
    });
});
