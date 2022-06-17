import * as exclusionVariables from "../../../theme/native/exclusion-variables";

// ================================== CORE ==================================\\
//
//
// Base
import * as flex from "./core/base/flex";
import * as spacing from "./core/base/spacing";
//
//
// Components

import * as widgetsAccordion from "./core/widgets/accordion";
import * as helpersAccordion from "./core/helpers/accordion";
import * as widgetsActivityIndicator from "./core/widgets/activityindicator";
import * as helpersActivityIndicator from "./core/helpers/activityindicator";
import * as widgetsAnimation from "./core/widgets/animation";
import * as widgetsBackgroundImage from "./core/widgets/backgroundimage";
import * as widgetsBadge from "./core/widgets/badge";
import * as helpersBadge from "./core/helpers/badge";
import * as widgetsBottomSheet from "./core/widgets/bottomsheet";
import * as widgetsButtons from "./core/widgets/buttons";
import * as helpersButtons from "./core/helpers/buttons";
import * as widgetsCarousel from "./core/widgets/carousel";
import * as widgetsCheckBox from "./core/widgets/checkbox";
import * as widgetsColorPicker from "./core/widgets/colorpicker";
import * as widgetsContainer from "./core/widgets/container";
import * as widgetsDatePicker from "./core/widgets/datepicker";
import * as widgetsDropDown from "./core/widgets/dropdown";
import * as widgetsFeedback from "./core/widgets/feedback";
import * as widgetsFloatingActionButton from "./core/widgets/floatingactionbutton";
import * as helpersFloatingActionButton from "./core/helpers/floatingactionbutton";
import * as widgetsImage from "./core/widgets/image";
import * as helpersImage from "./core/helpers/image";
import * as widgetsIntroScreen from "./core/widgets/introscreen";
import * as helpersIntroScreen from "./core/helpers/introscreen";
import * as widgetsLayoutGrid from "./core/widgets/layoutgrid";
import * as widgetsLineChart from "./core/widgets/linechart";
import * as helpersLineChart from "./core/helpers/linechart";
import * as widgetsBarChart from "./core/widgets/barchart";
import * as helpersBarChart from "./core/helpers/barchart";
import * as widgetsListView from "./core/widgets/listview";
import * as helpersListView from "./core/helpers/listview";
import * as widgetsListViewSwipe from "./core/widgets/listviewswipe";
import * as helpersListViewSwipe from "./core/helpers/listviewswipe";
import * as widgetsMaps from "./core/widgets/maps";
import * as helpersMaps from "./core/helpers/maps";
import * as widgetsNavigation from "./core/widgets/navigation";
import * as widgetsPageTitle from "./core/widgets/pagetitle";
import * as widgetsPieDoughnutChart from "./core/widgets/piedoughnutchart";
import * as widgetsProgressBar from "./core/widgets/progressbar";
import * as helpersProgressBar from "./core/helpers/progressbar";
import * as widgetsProgressCircle from "./core/widgets/progresscircle";
import * as helpersProgressCircle from "./core/helpers/progresscircle";
import * as widgetsPopUpMenu from "./core/widgets/popupmenu";
import * as widgetsQRCode from "./core/widgets/qrcode";
import * as widgetsRangeSlider from "./core/widgets/rangeslider";
import * as helpersRangeSlider from "./core/helpers/rangeslider";
import * as widgetsRating from "./core/widgets/rating";
import * as widgetsReferenceSelector from "./core/widgets/referenceselector";
import * as widgetsSafeAreaView from "./core/widgets/safeareaview";
import * as widgetsSlider from "./core/widgets/slider";
import * as helpersSlider from "./core/helpers/slider";
import * as widgetsSwitch from "./core/widgets/switch";
import * as helpersSwitch from "./core/helpers/switch";
import * as widgetsTabContainer from "./core/widgets/tabcontainer";
import * as helpersTabContainer from "./core/helpers/tabcontainer";
import * as widgetsTextArea from "./core/widgets/textarea";
import * as widgetsTextBox from "./core/widgets/textbox";
import * as helpersTextBox from "./core/helpers/textbox";
import * as widgetsToggleButtons from "./core/widgets/togglebuttons";
import * as widgetsTypography from "./core/widgets/typography";
import * as helpersTypography from "./core/helpers/typography";
import * as widgetsVideoPlayer from "./core/widgets/videoplayer";
import * as widgetsWebView from "./core/widgets/webview";
import * as helperClasses from "./core/helpers/helperclasses";
import * as radioButtons from "./core/widgets/radiobuttons";
import * as helperRadioButtons from "./core/helpers/radiobuttons";
import * as backgroundGradient from "./core/widgets/backgroundgradient";
import * as helperBackgroundGradient from "./core/helpers/backgroundgradient";
import * as widgetsColumnChart from "./core/widgets/columnchart";
import * as helpersColumnChart from "./core/helpers/columnchart";
//
//
// ================================= CUSTOM =================================\\
//
//
// Layouts
import * as layout from "./layouts/layout";
import * as page from "./layouts/page";

module.exports = [
    flex,
    spacing,
    !exclusionVariables.excludeAccordion ? widgetsAccordion : {},
    !exclusionVariables.excludeAccordion && !exclusionVariables.excludeAccordionHelpers ? helpersAccordion : {},
    !exclusionVariables.excludeActivityIndicator ? widgetsActivityIndicator : {},
    !exclusionVariables.excludeActivityIndicator && !exclusionVariables.excludeActivityIndicatorHelpers
        ? helpersActivityIndicator
        : {},
    !exclusionVariables.excludeAnimation ? widgetsAnimation : {},
    !exclusionVariables.excludeBackgroundImage ? widgetsBackgroundImage : {},
    !exclusionVariables.excludeBadge ? widgetsBadge : {},
    !exclusionVariables.excludeBadge && !exclusionVariables.excludeBadgeHelpers ? helpersBadge : {},
    !exclusionVariables.excludeBottomSheet ? widgetsBottomSheet : {},
    !exclusionVariables.excludeButtons ? widgetsButtons : {},
    !exclusionVariables.excludeButtons && !exclusionVariables.excludeButtonsHelpers ? helpersButtons : {},
    !exclusionVariables.excludeCarousel ? widgetsCarousel : {},
    !exclusionVariables.excludeCheckBox ? widgetsCheckBox : {},
    !exclusionVariables.excludeColorPicker ? widgetsColorPicker : {},
    !exclusionVariables.excludeContainer ? widgetsContainer : {},
    !exclusionVariables.excludeDatePicker ? widgetsDatePicker : {},
    !exclusionVariables.excludeDropDown ? widgetsDropDown : {},
    !exclusionVariables.excludeFeedback ? widgetsFeedback : {},
    !exclusionVariables.excludeFAB ? widgetsFloatingActionButton : {},
    !exclusionVariables.excludeFAB && !exclusionVariables.excludeFABHelpers ? helpersFloatingActionButton : {},
    !exclusionVariables.excludeImage ? widgetsImage : {},
    !exclusionVariables.excludeImage && !exclusionVariables.excludeImageHelpers ? helpersImage : {},
    !exclusionVariables.excludeIntroScreen ? widgetsIntroScreen : {},
    !exclusionVariables.excludeIntroScreen && !exclusionVariables.excludeIntroScreenHelpers ? helpersIntroScreen : {},
    !exclusionVariables.excludeLayoutGrid ? widgetsLayoutGrid : {},
    !exclusionVariables.excludeLineChart ? widgetsLineChart : {},
    !exclusionVariables.excludeLineChart && !exclusionVariables.excludeLineChartHelpers ? helpersLineChart : {},
    !exclusionVariables.excludeBarChart ? widgetsBarChart : {},
    !exclusionVariables.excludeBarChart && !exclusionVariables.excludeBarChartHelpers ? helpersBarChart : {},
    !exclusionVariables.excludeListView ? widgetsListView : {},
    !exclusionVariables.excludeListView && !exclusionVariables.excludeListViewHelpers ? helpersListView : {},
    !exclusionVariables.excludeListViewSwipe ? widgetsListViewSwipe : {},
    !exclusionVariables.excludeListViewSwipe && !exclusionVariables.excludeListViewSwipeHelpers
        ? helpersListViewSwipe
        : {},
    !exclusionVariables.excludeMaps ? widgetsMaps : {},
    !exclusionVariables.excludeMaps && !exclusionVariables.excludeMapsHelpers ? helpersMaps : {},
    widgetsNavigation,
    !exclusionVariables.excludePageTitle ? widgetsPageTitle : {},
    !exclusionVariables.excludePieDoughnutChart ? widgetsPieDoughnutChart : {},
    !exclusionVariables.excludeProgressBar ? widgetsProgressBar : {},
    !exclusionVariables.excludeProgressBar && !exclusionVariables.excludeProgressBarHelpers ? helpersProgressBar : {},
    !exclusionVariables.excludeProgressCircle ? widgetsProgressCircle : {},
    !exclusionVariables.excludeProgressCircle && !exclusionVariables.excludeProgressCircleHelpers
        ? helpersProgressCircle
        : {},
    !exclusionVariables.excludePopUpMenu ? widgetsPopUpMenu : {},
    !exclusionVariables.excludeQRCode ? widgetsQRCode : {},
    !exclusionVariables.excludeRangeSlider ? widgetsRangeSlider : {},
    !exclusionVariables.excludeRangeSlider && !exclusionVariables.excludeRangeSliderHelpers ? helpersRangeSlider : {},
    !exclusionVariables.excludeRating ? widgetsRating : {},
    !exclusionVariables.excludeReferenceSelector ? widgetsReferenceSelector : {},
    !exclusionVariables.excludeSafeAreaView ? widgetsSafeAreaView : {},
    !exclusionVariables.excludeSlider ? widgetsSlider : {},
    !exclusionVariables.excludeSlider && !exclusionVariables.excludeSliderHelpers ? helpersSlider : {},
    !exclusionVariables.excludeSwitch ? widgetsSwitch : {},
    !exclusionVariables.excludeSwitch && !exclusionVariables.excludeSwitchHelpers ? helpersSwitch : {},
    !exclusionVariables.excludeTabContainer ? widgetsTabContainer : {},
    !exclusionVariables.excludeTabContainer && !exclusionVariables.excludeTabContainerHelpers
        ? helpersTabContainer
        : {},
    !exclusionVariables.excludeTextArea ? widgetsTextArea : {},
    !exclusionVariables.excludeTextBox ? widgetsTextBox : {},
    !exclusionVariables.excludeTextBox && !exclusionVariables.excludeTextBoxHelpers ? helpersTextBox : {},
    !exclusionVariables.excludeToggleButtons ? widgetsToggleButtons : {},
    !exclusionVariables.excludeTypography ? widgetsTypography : {},
    !exclusionVariables.excludeTypography && !exclusionVariables.excludeTypographyHelpers ? helpersTypography : {},
    !exclusionVariables.excludeVideoPlayer ? widgetsVideoPlayer : {},
    !exclusionVariables.excludeWebView ? widgetsWebView : {},
    !exclusionVariables.excludeHelpers ? helperClasses : {},
    !exclusionVariables.excludeRadioButtons ? radioButtons : {},
    !exclusionVariables.excludeRadioButtons && !exclusionVariables.excludeRadioButtonsHelper ? helperRadioButtons : {},
    !exclusionVariables.excludeBackgroundGradient ? backgroundGradient : {},
    !exclusionVariables.excludeBackgroundGradient && !exclusionVariables.excludeBackgroundGradientHelper
        ? helperBackgroundGradient
        : {},
    !exclusionVariables.excludeColumnChart ? widgetsColumnChart : {},
    !exclusionVariables.excludeColumnChart && !exclusionVariables.excludeColumnChartHelper ? helpersColumnChart : {},
    layout,
    page
].reduce((merged, object) => ({ ...merged, ...object }), {});
