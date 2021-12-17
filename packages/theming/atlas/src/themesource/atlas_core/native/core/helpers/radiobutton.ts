import { background, brand, font, border } from "../../variables";
import { RADIO_BUTTON_SIZE } from "../widgets/radiobutton";

export const radioButtonPrimary = {
    caption: {
        color: brand.primary
    },
    defaultCircleRadioButton: {
        backgroundColor: background.secondary,
        borderColor: background.brandPrimary
    },
    activeCircleRadioButton: {
        backgroundColor: background.brandPrimary
    }
};

export const radioButtonSuccess = {
    caption: {
        color: brand.success
    },
    defaultCircleRadioButton: {
        backgroundColor: background.secondary,
        borderColor: background.brandSuccess
    },
    activeCircleRadioButton: {
        backgroundColor: background.brandSuccess
    }
};

export const radioButtonWarning = {
    caption: {
        color: brand.warning
    },
    defaultCircleRadioButton: {
        backgroundColor: background.secondary,
        borderColor: background.brandWarning
    },
    activeCircleRadioButton: {
        backgroundColor: background.brandWarning
    }
};

export const radioButtonDanger = {
    caption: {
        color: brand.danger
    },
    defaultCircleRadioButton: {
        backgroundColor: background.secondary,
        borderColor: background.brandDanger
    },
    activeCircleRadioButton: {
        backgroundColor: background.brandDanger
    }
};

export const radioButtonInfo = {
    caption: {
        color: brand.info
    },
    defaultCircleRadioButton: {
        backgroundColor: background.secondary,
        borderColor: background.brandInfo
    },
    activeCircleRadioButton: {
        backgroundColor: background.brandInfo
    }
};

export const radioButtonSmall = {
    caption: {
        fontSize: font.sizeSmallest
    },
    defaultCircleRadioButton: {
        height: RADIO_BUTTON_SIZE / 2,
        width: RADIO_BUTTON_SIZE / 2,
        borderRadius: border.radiusLargest
    },
    activeCircleRadioButton: {
        height: RADIO_BUTTON_SIZE / 5,
        width: RADIO_BUTTON_SIZE / 5,
        borderRadius: border.radiusLargest
    }
};

export const radioButtonLarge = {
    caption: {
        fontSize: font.sizeLargest
    },
    defaultCircleRadioButton: {
        borderWidth: 2,
        height: RADIO_BUTTON_SIZE * 2,
        width: RADIO_BUTTON_SIZE * 2,
        borderRadius: border.radiusLargest
    },
    activeCircleRadioButton: {
        height: RADIO_BUTTON_SIZE,
        width: RADIO_BUTTON_SIZE,
        borderRadius: border.radiusLargest
    }
};

export const radioButtonLabelLight = {
    caption: {
        fontWeight: font.weightLight
    }
};

export const radioButtonLabelNormal = {
    caption: {
        fontWeight: font.weightNormal
    }
};

export const radioButtonLabelBold = {
    caption: {
        fontWeight: font.weightBold
    }
};
