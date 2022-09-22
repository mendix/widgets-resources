import { createElement, ReactElement } from "react";
import { LanguageSelectorPreviewProps } from "typings/LanguageSelectorProps";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export const preview = (props: LanguageSelectorPreviewProps): ReactElement => {
    return (
        <LanguageSwitcher
            preview
            currentLanguage={{ _guid: "1", value: "Selected language" }}
            languageList={[{ _guid: "1", value: "Selected language" }]}
            position={props.position}
            onSelect={undefined}
            trigger={props.trigger}
            className={""}
        ></LanguageSwitcher>
    );
};

export function getPreviewCss(): string {
    return require("./ui/LanguageSelector.scss");
}
