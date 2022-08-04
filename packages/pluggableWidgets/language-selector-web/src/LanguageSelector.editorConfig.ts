import { Problem, Properties, StructurePreviewProps } from "@mendix/piw-utils-internal";
import { LanguageSelectorPreviewProps } from "typings/LanguageSelectorProps";

export function getProperties(__values: LanguageSelectorPreviewProps, defaultValues: Properties): Properties {
    return defaultValues;
}

export function check(__values: LanguageSelectorPreviewProps): Problem[] {
    const errors: Problem[] = [];
    return errors;
}

export function getPreview(
    __values: LanguageSelectorPreviewProps,
    __isDarkMode: boolean
): StructurePreviewProps | null {
    return null;
}
