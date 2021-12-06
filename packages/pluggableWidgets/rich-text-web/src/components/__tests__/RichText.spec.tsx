import { createElement } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RichTextEditor, RichTextProps } from "../RichText";

describe("RichText", () => {
    let defaultRichTextProps: RichTextProps;

    beforeEach(() => {
        defaultRichTextProps = {
            advancedConfig: null,
            dimensions: {
                width: 100,
                height: 100,
                heightUnit: "percentageOfWidth",
                widthUnit: "percentage"
            },
            plugins: [],
            value: "Simple Text",
            sanitizeContent: false,
            advancedContentFilter: null,
            readOnly: false,
            name: "RichText",
            preset: "basic",
            toolbarGroup: [],
            spellChecker: false,
            class: "",
            readOnlyStyle: "text",
            autoParagraph: false,
            editorType: "classic",
            enterMode: "paragraph",
            shiftEnterMode: "paragraph",
            toolbarConfig: "basic"
        };
    });
    it("render DOM structure", () => {
        const { asFragment } = render(<RichTextEditor {...defaultRichTextProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
