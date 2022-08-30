import { ReactNode, createElement, useEffect, useState, useCallback } from "react";
import { LanguageSelectorContainerProps } from "typings/LanguageSelectorProps";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import "./ui/LanguageSelector.scss";

export type LanguageItem = {
    _guid: string;
    value: string;
};

export default function LanguageSelector(props: LanguageSelectorContainerProps): ReactNode {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem | undefined>();
    const [languageList, setLanguageList] = useState<LanguageItem[]>([]);
    const [hideWidget, setHideWidget] = useState(false);

    useEffect(() => {
        if (props.languageOptions.items && props.languageCaption) {
            const languages = props.languageOptions.items.map(item => ({
                _guid: item.id,
                value: props.languageCaption.get(item).value as string
            }));
            setLanguageList(languages);
            if (languages.length < 2 && props.hideForSingle) {
                setHideWidget(true);
            }
        }
    }, [props]);

    useEffect(() => {
        const currentUser = window.mx.session.getUserObject();
        const currentLanguageId = currentUser.jsonData.attributes["System.User_Language"].value;
        const currentLanguage = languageList.find(language => language._guid === currentLanguageId);
        setSelectedLanguage(currentLanguage);
    }, [languageList]);

    const selectLanguage = useCallback((item: LanguageItem) => {
        const currentUser = window.mx.session.getUserObject();
        currentUser.addReference("System.User_Language", item._guid);
        window.mx.data.commit({
            mxobj: currentUser,
            callback() {
                setSelectedLanguage(item);
                window.mx.reloadWithState();
            }
        });
    }, []);

    return hideWidget ? null : (
        <LanguageSwitcher
            className={props.class}
            position={props.position}
            currentLanguage={selectedLanguage}
            languageList={languageList}
            onSelect={selectLanguage}
            trigger={props.trigger}
            preview={false}
        />
    );
}
