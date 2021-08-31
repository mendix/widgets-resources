import { brand, background, fontDefaults, accordion } from "../../variables";
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
export const accordionPrimary = {
    container: {},
    group: {
        container: {
            borderWidth: 1,
            borderColor: brand.primary
        },
        header: {
            container: {
                backgroundColor: brand.primary,
                borderColor: brand.primary,
                borderBottomWidth: 0
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
export const accordionSecondary = {
    container: {},
    group: {
        container: {
            borderWidth: 1,
            borderColor: "#CED0D3"
        },
        header: {
            container: {
                backgroundColor: background.primary,
                borderColor: "#CED0D3",
                borderBottomWidth: 0
            },
            heading1: {
                color: brand.primary
            },
            heading2: {
                color: brand.primary
            },
            heading3: {
                color: brand.primary
            },
            heading4: {
                color: brand.primary
            },
            heading5: {
                color: brand.primary
            },
            heading6: {
                color: brand.primary
            },
            icon: {
                color: brand.primary
            }
        }
    }
};
export const accordionSuccess = merge(accordionPrimary, {
    group: {
        container: {
            borderColor: brand.success
        },
        header: {
            container: {
                backgroundColor: brand.success,
                borderColor: brand.success
            }
        }
    }
});
export const accordionWarning = merge(accordionPrimary, {
    group: {
        container: {
            borderColor: brand.warning
        },
        header: {
            container: {
                backgroundColor: brand.warning,
                borderColor: brand.warning
            }
        }
    }
});
export const accordionDanger = merge(accordionPrimary, {
    group: {
        container: {
            borderColor: brand.danger
        },
        header: {
            container: {
                backgroundColor: brand.danger,
                borderColor: brand.danger
            }
        }
    }
});
export const accordionLined = {
    container: {
        borderTopWidth: 1
    },
    group: {
        container: {
            borderWidth: 0,
            borderBottomWidth: 1
        }
    }
};
export const accordionDividerNone = {
    container: {
        borderWidth: 0,
        borderTopWidth: 0
    },
    group: {
        container: {
            borderWidth: 0,
            borderBottomWidth: 0
        }
    }
};
export const accordionCompact = {
    group: {
        header: {
            container: {
                paddingVertical: accordion.groupHeader.container.paddingVertical / 2,
                paddingHorizontal: accordion.groupHeader.container.paddingHorizontal / 2
            }
        },
        content: {
            paddingTop: accordion.groupContent.paddingTop / 2,
            paddingBottom: accordion.groupContent.paddingBottom / 2,
            paddingHorizontal: accordion.groupContent.paddingHorizontal / 2
        }
    }
};
