/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
==========================================================================
*/

import { brand } from "../../../../../theme/native/custom-variables";
import { RadioButtonsStyle } from "../../types/widgets";

export const radioPrimary: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.primary
    },
    activeBtnStyle: {
        backgroundColor: brand.primary
    },
    radioItemTitleStyle: {
        color: brand.primary
    }
};

export const radioInfo: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.info
    },
    activeBtnStyle: {
        backgroundColor: brand.info
    },
    radioItemTitleStyle: {
        color: brand.info
    }
};

export const radioDanger: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.danger
    },
    activeBtnStyle: {
        backgroundColor: brand.danger
    },
    radioItemTitleStyle: {
        color: brand.danger
    }
};

export const radioDangerLight: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.dangerLight
    },
    activeBtnStyle: {
        backgroundColor: brand.dangerLight
    },
    radioItemTitleStyle: {
        color: brand.dangerLight
    }
};

export const radioInfoLight: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.infoLight
    },
    activeBtnStyle: {
        backgroundColor: brand.infoLight
    },
    radioItemTitleStyle: {
        color: brand.infoLight
    }
};

export const radioPrimaryLight: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.primaryLight
    },
    activeBtnStyle: {
        backgroundColor: brand.primaryLight
    },
    radioItemTitleStyle: {
        color: brand.primaryLight
    }
};

export const radioSuccess: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.success
    },
    activeBtnStyle: {
        backgroundColor: brand.success
    },
    radioItemTitleStyle: {
        color: brand.success
    }
};

export const radioSuccessLight: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.successLight
    },
    activeBtnStyle: {
        backgroundColor: brand.successLight
    },
    radioItemTitleStyle: {
        color: brand.successLight
    }
};

export const radioWarning: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.warning
    },
    activeBtnStyle: {
        backgroundColor: brand.warning
    },
    radioItemTitleStyle: {
        color: brand.warning
    }
};

export const radioWarningLight: RadioButtonsStyle = {
    circularBtnStyle: {
        borderColor: brand.warningLight
    },
    activeBtnStyle: {
        backgroundColor: brand.warningLight
    },
    radioItemTitleStyle: {
        color: brand.warningLight
    }
};
