export const variant = (color, backgroundColor, borderColor) => {
  return {
    button: {
      borderColor,
      backgroundColor,
    },
    icon: {
      color,
    },
    caption: {
      color,
    },
  };
};
export const iconOnly = color => {
  return {
    button: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    icon: {
      // margin: 0,
      // padding: 0,
      color,
    },
    caption: {
      fontSize: 0,
      // margin: 0,
      // padding: 0,
      // width: 0,
      // height: 0,
      // lineHeight: 0,
      // fontsize: 0
    },
  };
};
