import { hidePropertyIn, Problem, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import { GalleryPreviewProps } from "../typings/GalleryProps";

export function getProperties(
    values: GalleryPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.pagination !== "buttons") {
        hidePropertyIn(defaultProperties, values, "pagingPosition");
    }

    if (values.showEmptyPlaceholder === "none") {
        hidePropertyIn(defaultProperties, values, "emptyPlaceholder");
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function check(values: GalleryPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (!values.desktopItems || values.desktopItems < 1 || values.desktopItems > 12) {
        errors.push({
            property: "desktopItems",
            message: "Desktop items must be a number between 1 and 12"
        });
    }
    if (!values.phoneItems || values.phoneItems < 1 || values.phoneItems > 12) {
        errors.push({
            property: "phoneItems",
            message: "Phone items must be a number between 1 and 12"
        });
    }
    if (!values.tabletItems || values.tabletItems < 1 || values.tabletItems > 12) {
        errors.push({
            property: "tabletItems",
            message: "Tablet items must be a number between 1 and 12"
        });
    }
    return errors;
}
