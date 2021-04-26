import { ImageProps, Problem, RowLayoutProps } from "@mendix/piw-utils-internal";
import StructurePreviewRatingFilledSVG from "./assets/StructurePreviewRatingFilled.svg";
import StructurePreviewRatingEmptySVG from "./assets/StructurePreviewRatingEmpty.svg";
import { StarRatingPreviewProps } from "../typings/StarRatingProps";

export const getPreview = (props: StarRatingPreviewProps): RowLayoutProps => {
    const ratingFilledSVG = decodeURIComponent(StructurePreviewRatingFilledSVG.replace("data:image/svg+xml,", ""));
    const ratingEmptySVG = decodeURIComponent(StructurePreviewRatingEmptySVG.replace("data:image/svg+xml,", ""));
    return {
        type: "RowLayout",
        borders: false,
        padding: 8,
        columnSize: "fixed",
        children:
            props.maximumValue !== null
                ? [
                      ...Array.from({ length: props.maximumValue - 1 }).map(
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
    if (!values.maximumValue || values.maximumValue < 0) {
        errors.push({
            property: "maximumValue",
            message: "Number of stars should be greater than Zero (0)"
        });
    }
    return errors;
}
