import { ImageProps, RowLayoutProps } from "@mendix/piw-utils-internal";
import { RatingPreviewProps } from "../typings/RatingProps";
import StructurePreviewRatingFilledSVG from "./assets/StructurePreviewRatingFilled.svg";
import StructurePreviewRatingEmptySVG from "./assets/StructurePreviewRatingEmpty.svg";

export const getPreview = (props: RatingPreviewProps): RowLayoutProps => {
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
