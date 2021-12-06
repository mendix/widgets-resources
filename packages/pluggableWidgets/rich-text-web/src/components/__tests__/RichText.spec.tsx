import { createElement } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RichTextEditor, RichTextProps } from "../RichText";
import { getPreset } from "../../utils/ckeditorConfigs";

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
            spellChecker: false,
            class: "",
            readOnlyStyle: "text",
            editorType: "classic",
            enterMode: "paragraph",
            shiftEnterMode: "paragraph",
            toolbar: getPreset("basic")
        };
    });
    it("render DOM structure", () => {
        const { asFragment } = render(<RichTextEditor {...defaultRichTextProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
