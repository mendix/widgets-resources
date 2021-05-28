import { brand, fontDefaults } from "../../variables";
import { AccordionType } from "../../types/widgets";
import merge from "./_functions/mergeobjects";

/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Accordion

    Default Class For Mendix Accordion Widget
========================================================================== */
export const accordionPrimary: AccordionType = {
    group: {
        container: {
            borderWidth: 1,
            borderColor: brand.primary
        },
        header: {
            container: {
                backgroundColor: brand.primary
            },
            heading1: {
                color: fontDefaults.colorTitleLight
            },
            heading2: {
                color: fontDefaults.colorTitleLight
            },
            heading3: {
                color: fontDefaults.colorTitleLight
            },
            heading4: {
                color: fontDefaults.colorTitleLight
            },
            heading5: {
                color: fontDefaults.colorTitleLight
            },
            heading6: {
                color: fontDefaults.colorTitleLight
            },
            icon: {
                color: fontDefaults.colorTitleLight
            }
        }
    }
};

export const accordionSuccess: AccordionType = merge(accordionPrimary, {
    group: {
        container: {
            borderColor: brand.success
        },
        header: {
            container: {
                backgroundColor: brand.success
            }
        }
    }
});
export const accordionWarning: AccordionType = merge(accordionPrimary, {
    group: {
        container: {
            borderColor: brand.warning
        },
        header: {
            container: {
                backgroundColor: brand.warning
            }
        }
    }
});
export const accordionDanger: AccordionType = merge(accordionPrimary, {
    group: {
        container: {
            borderColor: brand.danger
        },
        header: {
            container: {
                backgroundColor: brand.danger
            }
        }
    }
});
