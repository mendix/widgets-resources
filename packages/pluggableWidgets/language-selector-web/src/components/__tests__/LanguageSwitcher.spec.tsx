import { render } from "@testing-library/react";
import { createElement } from "react";
import { PositionEnum, TriggerEnum } from "typings/LanguageSelectorProps";
import { LanguageSwitcher, LanguageSwitcherProps } from "../LanguageSwitcher";

let props: LanguageSwitcherProps = {
    preview: false,
    currentLanguage: undefined,
    languageList: [],
    position: "left" as PositionEnum,
    onSelect: jest.fn(),
    trigger: "click" as TriggerEnum,
    className: ""
};
const language = { _guid: "111", value: "En us" };

describe("Language switcher", () => {
    it("renders the structure with empty language list", () => {
        const { asFragment } = render(<LanguageSwitcher {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders the structure with language list and selected default language", () => {
        props = { ...props, languageList: [language], currentLanguage: language };
        const { asFragment } = render(<LanguageSwitcher {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
