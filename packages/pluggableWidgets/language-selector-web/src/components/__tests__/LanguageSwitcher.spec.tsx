import { mount, render } from "enzyme";
import { createElement } from "react";
import { LanguageItem } from "src/LanguageSelector";
import { LanguageSwitcher } from "../LanguageSwitcher";

const props = {};
describe("Language switcher", () => {
    it("renders the structure with an image", () => {
        expect(
            render(
                <LanguageSwitcher
                    preview={false}
                    currentLanguage={undefined}
                    languageList={[]}
                    position={"left"}
                    onSelect={function (lang: LanguageItem): void {
                        throw new Error("Function not implemented.");
                    }}
                    trigger={"click"}
                    {...props}
                />
            )
        ).toMatchSnapshot();
    });
});
