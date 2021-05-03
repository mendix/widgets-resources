import { hidePropertiesIn, hidePropertyIn, Properties } from "@mendix/piw-utils-internal";

import { ShrinkingHeaderPreviewProps } from "../typings/ShrinkingHeaderProps";

export function getProperties(values: ShrinkingHeaderPreviewProps, defaultProperties: Properties): Properties {
    if (values.threshold) {
        hidePropertiesIn(defaultProperties, values, ["initHeight", "shrunkHeight"]);
    } else {
        hidePropertyIn(defaultProperties, values, "shrinkThreshold");
    }

    return defaultProperties;
}
