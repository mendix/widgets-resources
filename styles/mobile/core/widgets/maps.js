import { brand, deviceWidth } from '../variables';

export const Maps = {
    container: {
        // All ViewStyle properties are allowed
        height: 200,
        width: deviceWidth / 2,
    },
    marker: {
        //Just allow these 2 properties
        color: brand.primary,
        opacity: 1,
    },
};
