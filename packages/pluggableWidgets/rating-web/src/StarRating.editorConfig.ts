import { ImageProps, RowLayoutProps } from "@mendix/piw-utils-internal";
import { Problem } from "@mendix/pluggable-widgets-tools";

import StructurePreviewRatingFilledSVG from "./assets/StructurePreviewRatingFilled.svg";
import StructurePreviewRatingFilledSVGDark from "./assets/StructurePreviewRatingFilled-dark.svg";
import StructurePreviewRatingEmptySVG from "./assets/StructurePreviewRatingEmpty.svg";
import StructurePreviewRatingEmptySVGDark from "./assets/StructurePreviewRatingEmpty-dark.svg";
import { StarRatingPreviewProps } from "../typings/StarRatingProps";

export const getPreview = (props: StarRatingPreviewProps, isDarkMode: boolean): RowLayoutProps => {
    const ratingFilledSVG = decodeURIComponent(
        (isDarkMode ? StructurePreviewRatingFilledSVGDark : StructurePreviewRatingFilledSVG).replace(
            "data:image/svg+xml,",
            ""
        )
    );
    const ratingEmptySVG = decodeURIComponent(
        (isDarkMode ? StructurePreviewRatingEmptySVGDark : StructurePreviewRatingEmptySVG).replace(
            "data:image/svg+xml,",
            ""
        )
    );
    return {
        type: "RowLayout",
        borders: false,
        padding: 8,
        columnSize: "fixed",
        children:
            props.maximumStars !== null
                ? [
                      ...Array.from({ length: (props.maximumStars > 50 ? 50 : props.maximumStars) - 1 }).map(
                          (): ImageProps => ({
                              type: "Image",
                              document: ratingFilledSVG,
                              width: 24,
                              height: 24
                          })
                      ),
                      {
                          type: "Image",
                          document: ratingEmptySVG,
                          width: 24,
                          height: 24
                      }
                  ]
                : [
                      {
                          type: "Image",
                          document: ratingFilledSVG,
                          width: 24,
                          height: 24
                      }
                  ]
    };
};

export function check(values: StarRatingPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (!values.maximumStars || values.maximumStars <= 0) {
        errors.push({
            property: "maximumValue",
            message: "Number of stars should be greater than zero (0)"
        });
    }
    return errors;
}
