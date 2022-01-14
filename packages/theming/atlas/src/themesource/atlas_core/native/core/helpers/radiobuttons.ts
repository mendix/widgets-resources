/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
==========================================================================
*/

import { brand } from "../../../../../theme/native/custom-variables";
import { RadioButtonsItemStyle, RadioButtonsLabelStyle } from "../../types/widgets";

// Radio buttons properties
export const radioButtonsPrimary: RadioButtonsItemStyle = {
    circularButtonStyle: {
        borderColor: brand.primary
    },
    activeButtonStyle: {
        backgroundColor: brand.primary
    },
    radioButtonItemTitleStyle: {
        color: brand.primary
    }
};

export const radioButtonsSuccess: RadioButtonsItemStyle = {
    circularButtonStyle: {
        borderColor: brand.success
    },
    activeButtonStyle: {
        backgroundColor: brand.success
    },
    radioButtonItemTitleStyle: {
        color: brand.success
    }
};

export const radioButtonsWarning: RadioButtonsItemStyle = {
    circularButtonStyle: {
        borderColor: brand.warning
    },
    activeButtonStyle: {
        backgroundColor: brand.warning
    },
    radioButtonItemTitleStyle: {
        color: brand.warning
    }
};

export const radioButtonsDanger: RadioButtonsItemStyle = {
    circularButtonStyle: {
        borderColor: brand.danger
    },
    activeButtonStyle: {
        backgroundColor: brand.danger
    },
    radioButtonItemTitleStyle: {
        color: brand.danger
    }
};

export const radioButtonsInfo: RadioButtonsItemStyle = {
    circularButtonStyle: {
        borderColor: brand.info
    },
    activeButtonStyle: {
        backgroundColor: brand.info
    },
    radioButtonItemTitleStyle: {
        color: brand.info
    }
};

// Radio buttons label properties
export const radioButtonsLabelPrimary: RadioButtonsLabelStyle = {
    labelTextStyle: {
        color: brand.primary
    }
};

export const radioButtonsLabelSuccess: RadioButtonsLabelStyle = {
    labelTextStyle: {
        color: brand.success
    }
};

export const radioButtonsLabelWarning: RadioButtonsLabelStyle = {
    labelTextStyle: {
        color: brand.warning
    }
};

export const radioButtonsLabelDanger: RadioButtonsLabelStyle = {
    labelTextStyle: {
        color: brand.danger
    }
};

export const radioButtonsLabelInfo: RadioButtonsLabelStyle = {
    labelTextStyle: {
        color: brand.info
    }
};
