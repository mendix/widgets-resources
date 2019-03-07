import {} from '../variables';

/* ==========================================================================
    Images

    Default Class For Mendix Image Widgets
========================================================================== */

export const Image = {
    //TODO: Delete width / height when resizing in modeler works
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
};

export const DynamicImage = {};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Image Sizes

export const imageLarge = {
    //TODO: Delete width / height when resizing in modeler works
    width: Image.width + 30,
    height: Image.height + 30,
};
export const imageSmall = {
    //TODO: Delete width / height when resizing in modeler works
    width: Image.width - 20,
    height: Image.height - 20,
};

export const imageRounded = {
    borderRadius: Math.max(Image.width, Image.height) / 2,
};
export const imageRoundedLarge = {
    ...imageLarge,
    borderRadius: Math.max(imageLarge.width, imageLarge.height) / 2,
};
export const imageRoundedSmall = {
    ...imageSmall,
    borderRadius: Math.max(imageSmall.width, imageSmall.height) / 2,
};

export const imageHeader = {
    //TODO: Delete width / height when resizing in modeler works
    width: '100%',
    height: 200,
};
