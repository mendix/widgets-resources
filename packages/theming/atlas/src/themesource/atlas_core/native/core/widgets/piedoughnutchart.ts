import { brand } from "../../variables";
import { PieDoughnutChartStyle } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Bar Chart

    Default Class For Mendix Bar Chart Widget
========================================================================== */
export const com_mendix_widget_native_piedoughnutchart_PieDoughnutChart: PieDoughnutChartStyle = {
    container: {
        // All ViewStyle properties are allowed
    },
    slices: {
        /*
            Allowed properties:
                -  colorPalette (string with array of colors separated by ';')
                -  innerRadius (number)
                -  padding (number)
                -  paddingBottom (number)
                -  paddingHorizontal (number)
                -  paddingLeft (number)
                -  paddingRight (number)
                -  paddingTop (number)
                -  paddingVertical (number)
        */
        colorPalette: Object.values(brand)
            .map((color, index, brandColors) => (index === brandColors.length - 1 ? color : `${color};`))
            .join(""),
        customStyles: {
            your_defined_key: {
                slice: {
                    /*
                    Allowed properties:
                      -  color (string)
                */
                },
                label: {
                    /*
                    Allowed properties:
                      -  color (string)
                      -  fontFamily (string)
                      -  fontSize (number)
                      -  fontStyle ("normal" or "italic")
                      -  fontWeight ("normal" or "bold" or "100" or "200" or "300" or "400" or "500" or "600" or "700" or "800" or "900")
                    */
                }
            }
        }
    }
};
