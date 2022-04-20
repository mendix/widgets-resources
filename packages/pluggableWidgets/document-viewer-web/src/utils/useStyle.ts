import { CSSProperties, useMemo } from "react";

import { Dimensions, getDimensions } from "@mendix/piw-utils-internal";

export function useStyle(dimensions: Dimensions): CSSProperties {
    return useMemo(() => {
        return getDimensions(dimensions);
    }, [dimensions]);
}
