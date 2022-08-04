import { ReactNode, createElement, useEffect, useState, useCallback } from "react";
import { LanguageSelectorContainerProps } from "typings/LanguageSelectorProps";
import { PopupMenu } from "./Popup/PopupMenu";

export type AttributeView = {
    value: string;
    key: string;
};
export type LanguageAttribute = {
    Code: AttributeView;
    Description: AttributeView;
};
export type LanguageItem = {
    _guid: string;
    jsonData: {
        attributes: LanguageAttribute;
    };
};
export default function LanguageSelector(props: LanguageSelectorContainerProps): ReactNode {
    const [language, setLanguage] = useState<LanguageItem | null>(null);
    const [languageList, setLanguageList] = useState<LanguageItem[]>([]);
    useEffect(() => {
        const getLanguages = (): void => {
            window.mx.data.get({
                xpath: "//System.Language",
                callback: (objs: LanguageItem[]) => {
                    if (objs.length) {
                        setLanguageList(objs);
                        const currentLanguage: LanguageItem | null =
                            objs.find(
                                (lang: LanguageItem) =>
                                    lang._guid ===
                                    window.mx.session.getUserObject()?.jsonData.attributes["System.User_Language"].value
                            ) || null;
                        console.log(currentLanguage);
                        setLanguage(currentLanguage);
                    }
                },
                error: e => console.log("errr", e)
            });
        };
        getLanguages();
    }, [window.mx]);

    const selectLanguage = useCallback((item: LanguageItem) => {
        setLanguage(item);
        window.mx.session.getUserObject()?.addReference("System.User_Language", "" + item._guid);
        window.mx.data.commit({
            mxobj: window.mx.session.getUserObject(),
            callback() {
                // window.mx.session.sessionStore.remove().then(() => window.mx.reloadWithState());
                window.mx.session.clearCachedSessionData().then(() => window.mx.reload());
            },
            error: e => {
                console.error("Could not commit object:", e);
            }
        });
    }, []);
    return (
        <div>
            {mx.session.getUserObject()?.addReference ? (
                <PopupMenu
                    position={props.position}
                    currentLanguage={language}
                    languageList={languageList}
                    onSelect={selectLanguage}
                    trigger={props.trigger}
                ></PopupMenu>
            ) : null}
        </div>
    );
}
