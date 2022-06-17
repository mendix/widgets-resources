import { Platform } from "react-native";
import * as custom from "../../../theme/native/custom-variables";
import adjustFont, { height, width } from "./core/helpers/_functions/adjustfont";
import { anyColorToRgbString, setContrastScale } from "./core/helpers/_functions/convertcolors";
import merge from "./core/helpers/_functions/mergeobjects";
import {
    VariablesAccordion,
    VariablesBackground,
    VariablesBackgroundDefaults,
    VariablesBadge,
    VariablesBorder,
    VariablesBrand,
    VariablesButton,
    VariablesContainer,
    VariablesContrast,
    VariablesFloatingActionButton,
    VariablesFont,
    VariablesFontDefaults,
    VariablesImage,
    VariablesInput,
    VariablesIntroScreen,
    VariablesLayoutgrid,
    VariablesListView,
    VariablesListViewSwipe,
    VariablesNavigation,
    VariablesProgressBar,
    VariablesProgressCircle,
    VariablesRating,
    VariablesSlider,
    VariablesSpacing,
    VariablesTabContainer,
    VariablesCheckbox,
    VariablesRadioButtons,
    VariableBackgroundGradient,
    VariablesColumnChart
} from "./types/variables";
//
//
// == Global variables
// ## Variables to be used during styling
// -------------------------------------------------------------------------------------------------------------------//
// System defined read-only values
export const deviceHeight = height;
export const deviceWidth = width;
//
// Brand Style
let brand: VariablesBrand = {
    primary: "#264AE5",
    success: "#3CB33D",
    warning: "#ECA51C",
    danger: "#E33F4E",
    info: "#0086D9",
    primaryLight: "#F3F5FF",
    successLight: "#F1FCF1",
    warningLight: "#FFF9E6",
    dangerLight: "#FFEEF0",
    infoLight: "#ECF9FF"
};
brand = merge(brand, custom.brand || ({} as any));
//
// Background colors
const backgroundDefaults: VariablesBackgroundDefaults = {
    primaryLight: "#FFF",
    primaryDark: "#0A1325",
    secondaryLight: "#F8F8F8",
    secondaryDark: "#161F30"
};
let background: VariablesBackground = {
    primary: custom.darkMode ? backgroundDefaults.primaryDark : backgroundDefaults.primaryLight,
    secondary: custom.darkMode ? backgroundDefaults.secondaryDark : backgroundDefaults.secondaryLight,
    brandPrimary: brand.primary,
    brandSuccess: brand.success,
    brandWarning: brand.warning,
    brandDanger: brand.danger,
    brandInfo: brand.info
};
background = merge(background, custom.background || ({} as any));
//
// Contrast (Gray) colors based on background.primary
let contrast: VariablesContrast = {
    highest: setContrastScale(0.95, background.primary),
    higher: setContrastScale(0.8, background.primary),
    high: setContrastScale(0.65, background.primary),
    regular: setContrastScale(0.5, background.primary),
    low: setContrastScale(0.35, background.primary),
    lower: setContrastScale(0.2, background.primary),
    lowest: setContrastScale(0.05, background.primary)
};
contrast = merge(contrast, custom.contrast || ({} as any));
//
// Border Style
let border: VariablesBorder = {
    color: custom.darkMode ? "#3B4251" : "#CED0D3",
    width: 1,
    radiusSmall: 4,
    radiusLarge: 8,
    radiusLargest: 9999
};
border = merge(border, custom.border || ({} as any));
//
// Font Styles
const fontDefaults: VariablesFontDefaults = {
    colorTitleDark: "#0A1326",
    colorTitleLight: "#FDFDFD",
    colorParagraphDark: "#6C717E",
    colorParagraphLight: "#E7E7E9",
    colorDisabledDark: "#9DA1A8",
    colorDisabledLight: "#9DA1A8"
};
let font: VariablesFont = {
    size: adjustFont(14),
    sizeSmallest: adjustFont(10),
    sizeSmall: adjustFont(12),
    sizeLarge: adjustFont(16),
    sizeLargest: adjustFont(18),
    sizeH1: adjustFont(40),
    sizeH2: adjustFont(34),
    sizeH3: adjustFont(28),
    sizeH4: adjustFont(24),
    sizeH5: adjustFont(20),
    sizeH6: adjustFont(16),
    lineHeight: adjustFont(14) * 1.5,
    lineHeightSmallest: adjustFont(10) * 1.5,
    lineHeightSmall: adjustFont(12) * 1.5,
    lineHeightLarge: adjustFont(16) * 1.5,
    lineHeightLargest: adjustFont(18) * 1.5,
    lineHeightH1: adjustFont(40) * 1.5,
    lineHeightH2: adjustFont(34) * 1.5,
    lineHeightH3: adjustFont(28) * 1.5,
    lineHeightH4: adjustFont(24) * 1.5,
    lineHeightH5: adjustFont(20) * 1.5,
    lineHeightH6: adjustFont(16) * 1.5,
    colorTitle: custom.darkMode ? fontDefaults.colorTitleLight : fontDefaults.colorTitleDark,
    colorParagraph: custom.darkMode ? fontDefaults.colorParagraphLight : fontDefaults.colorParagraphDark,
    colorDisabled: custom.darkMode ? fontDefaults.colorDisabledLight : fontDefaults.colorDisabledDark,
    weightLight: "100", // Only supported on iOS, will be 'Normal' on Android
    weightNormal: "normal",
    weightSemiBold: "600", // Only supported on iOS, will be 'Bold' on Android
    weightBold: "bold",
    family: Platform.select({ ios: "System", android: "normal" }) as string
};
font = merge(font, custom.font || ({} as any));
//
// Spacing
let spacing: VariablesSpacing = {
    smallest: 2,
    smaller: 4,
    small: 8,
    regular: 16,
    large: 24,
    larger: 32,
    largest: 40
};
spacing = merge(spacing, custom.spacing || ({} as any));
//
// Button Styles
let button: VariablesButton = {
    // Start default styles
    container: {
        rippleColor: contrast.lowest,
        borderRadius: border.radiusLarge,
        minWidth: 48,
        minHeight: 48,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small
    },
    containerDisabled: {
        borderColor: border.color,
        backgroundColor: border.color
    },
    icon: {
        size: font.sizeSmall
    },
    iconDisabled: {
        color: font.colorDisabled
    },
    caption: {
        fontSize: font.sizeSmall,
        fontWeight: font.weightBold
    },
    captionDisabled: {
        color: font.colorDisabled
    },
    // End default styles

    header: {
        color: contrast.highest,
        borderColor: "transparent",
        backgroundColor: "transparent",
        fontSize: font.sizeSmall,
        fontSizeIcon: font.sizeSmall,
        paddingLeft: 0,
        paddingRight: 10
    },
    primary: {
        color: "#FFF",
        borderColor: brand.primary,
        backgroundColor: brand.primary
    },
    secondary: {
        color: brand.primary,
        borderColor: brand.primary,
        backgroundColor: "transparent",
        inversedColor: "#FFF"
    },
    success: {
        color: "#FFF",
        borderColor: brand.success,
        backgroundColor: brand.success
    },
    warning: {
        color: "#FFF",
        borderColor: brand.warning,
        backgroundColor: brand.warning
    },
    danger: {
        color: "#FFF",
        borderColor: brand.danger,
        backgroundColor: brand.danger
    }
};
button = merge(button, custom.button || ({} as any));
//
// Input Styles
let input: VariablesInput = {
    label: {
        numberOfLines: 1,
        color: font.colorTitle,
        fontSize: font.sizeSmall,
        textAlign: "left"
    },
    labelDisabled: {
        color: font.colorTitle
    },
    input: {
        color: font.colorTitle,
        borderColor: contrast.lower,
        backgroundColor: background.primary,
        selectionColor: contrast.lower,
        placeholderTextColor: contrast.low,
        fontSize: font.size,
        lineHeight: font.lineHeight,
        borderWidth: border.width,
        borderRadius: border.radiusLarge,
        minWidth: 48,
        minHeight: 48,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small
    },
    inputContainer: {
        underlayColor: `rgba(${anyColorToRgbString(contrast.low)},0.4)`
    },
    inputDisabled: {
        color: font.colorDisabled,
        borderColor: border.color,
        backgroundColor: background.secondary
    },
    inputError: {
        color: brand.danger,
        borderColor: brand.danger,
        placeholderTextColor: brand.danger,
        backgroundColor: brand.dangerLight
    },
    validationMessage: {
        color: brand.danger,
        fontSize: font.size
    },

    // Only used for the DropDown & ReferenceSelector
    valueContainer: {
        rippleColor: contrast.lowest
    },
    itemContainer: {
        paddingVertical: 12,
        paddingHorizontal: spacing.regular,
        backgroundColor: background.primary
    },
    item: {
        color: font.colorTitle,
        fontSize: font.size
    },
    selectedItemContainer: {
        borderWidth: border.width,
        borderRadius: border.radiusLarge,
        borderColor: brand.primary,
        backgroundColor: "transparent"
    },
    selectedItem: {
        color: font.colorTitle,
        fontSize: font.size
    }
};
input = merge(input, custom.input || ({} as any));
//
// Image Styles
let image: VariablesImage = {
    image: {
        small: 24,
        medium: 40,
        large: 56,
        larger: 72
    },
    imageDisabled: {
        opacity: 0.6
    },
    icon: 16
};
image = merge(image, custom.image || ({} as any));
//
// Navigation Styles
let navigation: VariablesNavigation = {
    statusBar: {
        backgroundColor: background.primary,
        barStyle: custom.darkMode ? "light-content" : "dark-content"
    },
    topBar: {
        backgroundColor: brand.primary,
        backButtonColor: "#FFF",
        titleColor: "#FFF",
        titleFontSize: font.sizeH6
    },
    bottomBar: {
        color: contrast.high,
        selectedTextColor: brand.primary,
        selectedIconColor: brand.primary,
        backgroundColor: background.primary,
        fontSize: font.sizeSmall,
        iconSize: font.sizeSmall
    },
    progressOverlay: {
        color: font.colorTitle,
        activityIndicatorColor: font.colorTitle,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        containerBackgroundColor: background.secondary,
        fontSize: font.size,
        borderRadius: border.radiusSmall,
        elevation: 1.5, // Only for Android
        shadowColor: "#000", // Only for iOS
        shadowOpacity: 0.1, // Only for iOS
        shadowRadius: 10 // Only for iOS
    }
};
navigation = merge(navigation, custom.navigation || ({} as any));
//
// Container Styles
let container: VariablesContainer = {
    containerDisabled: {
        opacity: 0.6
    }
};
container = merge(container, custom.container || ({} as any));
//
// Accordion Styles
let accordion: VariablesAccordion = {
    container: {
        backgroundColor: background.primary,
        borderColor: border.color
    },
    groupHeader: {
        container: {
            paddingVertical: spacing.regular,
            paddingHorizontal: spacing.regular
        },
        heading: {
            color: font.colorTitle
        },
        icon: {
            size: font.sizeLarge,
            color: font.colorTitle
        }
    },
    groupContent: {
        paddingTop: spacing.small,
        paddingBottom: spacing.large,
        paddingHorizontal: spacing.regular
    }
};
accordion = merge(accordion, custom.accordion || ({} as any));
//
// Badge Styles
let badge: VariablesBadge = {
    fontWeight: font.weightNormal,
    borderRadius: border.radiusLarge,
    paddingVertical: spacing.smaller,
    paddingHorizontal: spacing.small,

    default: {
        color: contrast.higher,
        backgroundColor: contrast.lowest
    },
    primary: {
        color: brand.primary,
        backgroundColor: brand.primaryLight
    },
    success: {
        color: brand.success,
        backgroundColor: brand.successLight
    },
    warning: {
        color: brand.warning,
        backgroundColor: brand.warningLight
    },
    danger: {
        color: brand.danger,
        backgroundColor: brand.dangerLight
    }
};
badge = merge(badge, custom.badge || ({} as any));
//
// Tabcontainer Styles
let tabContainer: VariablesTabContainer = {
    tabBar: {
        pressColor: contrast.lower,
        backgroundColor: brand.primary
    },
    tab: {
        paddingVertical: 12
    },
    indicator: {
        backgroundColor: fontDefaults.colorTitleLight,
        height: Platform.select({ ios: 2, android: 2 }) as number
    },
    label: {
        color: fontDefaults.colorTitleLight,
        fontSize: font.size,
        fontWeight: font.weightSemiBold,
        textTransform: "capitalize"
    },
    activeLabel: {
        color: fontDefaults.colorTitleLight,
        fontSize: font.size,
        fontWeight: font.weightSemiBold,
        textTransform: "capitalize"
    },
    badgeContainer: {
        borderRadius: border.radiusLargest,
        backgroundColor: badge.default.backgroundColor,
        paddingVertical: spacing.smallest,
        paddingHorizontal: spacing.small,
        marginLeft: 8
    },
    badgeCaption: {
        fontSize: font.size,
        color: badge.default.color,
        fontWeight: badge.fontWeight
    }
};
tabContainer = merge(tabContainer, custom.tabContainer || ({} as any));
//
// Listview Styles
let listView: VariablesListView = {
    listItemDisabled: {
        opacity: 0.6
    },
    border: {
        color: border.color,
        width: border.width
    }
};
listView = merge(listView, custom.listView || ({} as any));
//
// Checkbox Styles
let checkbox: VariablesCheckbox = {
    checkboxInput: {
        color: brand.primary,
        size: 20, // this applies to the icon (tick)
        backgroundColor: background.primary,
        borderColor: border.color,
        borderWidth: border.width,
        borderRadius: border.radiusSmall,
        width: 40,
        height: 40
    },
    checkboxInputDisabled: {
        color: brand.primaryLight,
        backgroundColor: background.secondary
    },
    checkboxInputError: {
        color: brand.danger,
        borderColor: brand.danger
    }
};
checkbox = merge(checkbox, custom.checkbox || ({} as any));

//
// Layoutgrid Styles
let layoutGrid: VariablesLayoutgrid = {
    gutterSize: 16
};
layoutGrid = merge(layoutGrid, custom.layoutGrid || ({} as any));
//
//
// Floating Action Button Styles
let floatingActionButton: VariablesFloatingActionButton = {
    container: {
        margin: 30
    },
    button: {
        size: 50,
        rippleColor: contrast.lowest,
        borderColor: brand.primary,
        backgroundColor: brand.primary
    },
    buttonIcon: {
        size: font.sizeLarge,
        color: contrast.lowest
    },
    secondaryButton: {
        size: 30,
        backgroundColor: background.secondary
    },
    secondaryButtonIcon: {
        size: font.sizeSmall,
        color: contrast.high
    },
    secondaryButtonCaption: {
        color: contrast.high,
        fontSize: font.sizeSmall
    },
    secondaryButtonCaptionContainer: {
        backgroundColor: background.primary,
        borderColor: background.primary
    }
};
floatingActionButton = merge(floatingActionButton, custom.floatingActionButton || ({} as any));
//
// Intro Screen Styles
let introScreen: VariablesIntroScreen = {
    fullscreenContainer: {
        backgroundColor: background.primary
    },
    popupContainer: {
        paddingVertical: 150,
        paddingHorizontal: 50,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    pagination: {
        text: {
            color: font.colorTitle,
            fontSize: font.size
        },
        dotStyle: {
            size: spacing.small,
            backgroundColor: contrast.lower
        },
        activeDotStyle: {
            size: spacing.small,
            backgroundColor: font.colorTitle
        }
    },
    button: {
        icon: {
            color: font.colorTitle,
            size: button.icon.size
        },
        caption: {
            color: font.colorTitle,
            fontSize: button.caption.fontSize,
            fontWeight: font.weightBold,
            textTransform: "uppercase",
            paddingHorizontal: spacing.smallest
        }
    },
    buttonPaginationAbove: {
        container: {
            paddingVertical: spacing.regular,
            backgroundColor: button.primary.backgroundColor
        }
    }
};
introScreen = merge(introScreen, custom.introScreen || ({} as any));
//
// List View Swipe Styles
let listViewSwipe: VariablesListViewSwipe = {
    leftAction: {
        panelSize: 160,
        panelSizeSmall: 80,
        panelSizeLarge: 240,
        backgroundColor: background.primary
    },
    rightAction: {
        panelSize: 160,
        panelSizeSmall: 80,
        panelSizeLarge: 240,
        backgroundColor: background.primary
    }
};
listViewSwipe = merge(listViewSwipe, custom.listViewSwipe || ({} as any));
//
// Progress Bar Styles
let progressBar: VariablesProgressBar = {
    bar: {
        height: 8,
        heightSmall: 4,
        heightLarge: 12,
        backgroundColor: contrast.lowest
    },
    fill: {
        backgroundColor: brand.primary
    }
};
progressBar = merge(progressBar, custom.progressBar || ({} as any));
//
// Progress Circle Styles
let progressCircle: VariablesProgressCircle = {
    circle: {
        size: 64
    },
    fill: {
        width: 4,
        lineCapRounded: true,
        backgroundColor: brand.primary
    },
    text: {
        color: contrast.regular,
        fontSize: font.size,
        fontWeight: font.weightSemiBold
    }
};
progressCircle = merge(progressCircle, custom.progressCircle || ({} as any));
//
// Rating Styles
let rating: VariablesRating = {
    containerDisabled: {
        opacity: 0.5
    },
    icon: {
        size: 24,
        color: contrast.lower,
        selectedColor: brand.warning
    }
};
rating = merge(rating, custom.rating || ({} as any));
//
// (Range)Slider Styles
let slider: VariablesSlider = {
    track: {
        height: 4,
        backgroundColor: contrast.lowest
    },
    trackDisabled: {
        backgroundColor: contrast.lower,
        opacity: 0.4
    },
    highlight: {
        backgroundColor: brand.primary
    },
    highlightDisabled: {
        backgroundColor: brand.primary
    },
    marker: {
        size: 24,
        borderColor: contrast.lowest,
        backgroundColor: background.secondary
    },
    markerActive: {
        size: 32
    },
    markerDisabled: {
        size: 24,
        borderColor: contrast.lowest,
        backgroundColor: background.secondary
    }
};
slider = merge(slider, custom.slider || ({} as any));
//
// Radio Buttons
let radioButtons: VariablesRadioButtons = {
    labelTextStyle: {
        color: font.colorTitle,
        fontSize: font.sizeSmall,
        lineHeight: font.lineHeightSmall,
        marginBottom: spacing.small
    },
    radioButtonItemContainerStyle: {
        marginBottom: spacing.small
    },
    radioButtonItemContainerDisabledStyle: {
        opacity: 0.5
    },
    radioButtonItemContainerHorizontalStyle: {
        marginEnd: spacing.small
    },
    circularButtonStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderColor: border.color,
        marginEnd: spacing.smaller
    },
    activeButtonStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: brand.primary
    },
    radioButtonItemTitleStyle: {
        color: font.colorTitle,
        fontSize: font.sizeSmall,
        lineHeight: font.lineHeightSmall
    },
    validationMessage: {
        color: brand.danger,
        fontSize: font.sizeSmall
    }
};
radioButtons = merge(radioButtons, custom.radioButtons || ({} as any));
//
// Background Gradient
let backgroundGradient: VariableBackgroundGradient = {
    container: {}
};

backgroundGradient = merge(backgroundGradient, custom.backgroundGradient || ({} as any));

// column chart styles
let columnChart: VariablesColumnChart = {
    container: {},
    errorMessage: {
        fontFamily: font.family,
        fontSize: font.sizeSmall,
        fontWeight: font.weightNormal
    },
    chart: {},
    grid: {
        lineColor: border.color
    },
    xAxis: {
        color: font.colorTitle,
        fontFamily: font.family,
        fontSize: font.sizeSmall,
        fontWeight: font.weightNormal,
        label: {
            color: font.colorParagraph,
            alignSelf: "center",
            marginHorizontal: 0,
            marginVertical: 8,
            fontFamily: font.family,
            fontSize: font.sizeSmall,
            fontWeight: font.weightNormal
        },
        lineColor: border.color
    },
    yAxis: {
        color: font.colorTitle,
        fontFamily: font.family,
        fontSize: font.sizeSmall,
        fontWeight: font.weightNormal,
        label: {
            color: font.colorParagraph,
            marginHorizontal: 0,
            marginVertical: 8,
            fontFamily: font.family,
            fontSize: font.sizeSmall,
            fontWeight: font.weightNormal
        },
        lineColor: border.color
    },
    columns: {
        columnColorPalette: Object.entries(brand)
            .reduce((accumulator, [key, value]) => (key.endsWith("Light") ? accumulator : [...accumulator, value]), [])
            .join(";"),
        columnsOffset: 20,
        customColumnStyles: {
            your_static_or_dynamic_attribute_value: {
                column: {},
                label: {}
            }
        }
    },
    legend: {
        container: {
            justifyContent: "flex-start",
            marginHorizontal: 0,
            marginVertical: spacing.small
        },
        item: {
            padding: 0,
            paddingRight: spacing.regular
        },
        indicator: {
            marginRight: spacing.small
        },
        label: {
            color: font.colorTitle,
            fontFamily: font.family,
            fontSize: font.sizeSmall,
            fontWeight: font.weightNormal
        }
    }
};

columnChart = merge(columnChart, custom.columnChart || ({} as any));

export * from "../../../theme/native/custom-variables";
export {
    accordion,
    brand,
    backgroundDefaults,
    background,
    border,
    button,
    contrast,
    checkbox,
    fontDefaults,
    font,
    input,
    image,
    layoutGrid,
    listView,
    navigation,
    spacing,
    container,
    tabContainer,
    badge,
    floatingActionButton,
    introScreen,
    listViewSwipe,
    progressBar,
    progressCircle,
    slider,
    rating,
    radioButtons,
    backgroundGradient,
    columnChart
};
