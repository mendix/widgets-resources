import { contrast } from '../variables';

/* ==========================================================================
    Image

    Default Class For Mendix Image Widgets
========================================================================== */

export const Image = {
    container: {},
    image: {
        //TODO: Delete width / height when resizing in modeler works
        resizeMode: 'contain',
    },
};

export const DynamicImage = {
    container: {},
    image: {
        resizeMode: 'contain',
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Image Sizes

export const avatar = {
    container: {},
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
};

export const imageHeader = {
    container: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        elevation: 2,
        shadowColor: contrast.lowest,
        shadowOpacity: 0.9,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        zIndex: 10,
    },
    image: {
        //TODO: Delete width / height when resizing in modeler works
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
};
