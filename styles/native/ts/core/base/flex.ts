//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

//== Flex layout
export const flexMain = {
    container: {
        // flex 1 will take all available space not taken by flexItems.
        flex: 1,
    },
};
export const flexItem = {
    container: {
        // When flex is -1, the component is normally sized according width and height.
        // However, if there's not enough space, the component will shrink to its minWidth and minHeight
        flex: -1,
    },
};
export const flexRow = {
    container: {
        flexDirection: "row",
    },
};
export const flexColumn = {
    container: {
        flexDirection: "column",
    },
};
export const flexRowReverse = {
    container: {
        flexDirection: "row-reverse",
    },
};
export const flexColumnReverse = {
    container: {
        flexDirection: "column-reverse",
    },
};
export const flexWrap = {
    container: {
        // flexWrap controls whether children can wrap around after they hit the end of a flex container.
        flexWrap: "wrap",
    },
};

export const childrenCenter = {
    container: {
        ...justifyContentCenter,
        ...alignChildrenCenter,
    },
};
export const justifyContentStart = {
    container: {
        // justifyContent aligns children in the main direction.
        // For example, if children are flowing vertically, justifyContent controls how they align vertically.
        justifyContent: "flex-start",
    },
};
export const justifyContentCenter = {
    container: {
        // justifyContent aligns children in the main direction.
        // For example, if children are flowing vertically, justifyContent controls how they align vertically.
        justifyContent: "center",
    },
};
export const justifyContentEnd = {
    container: {
        // justifyContent aligns children in the main direction.
        // For example, if children are flowing vertically, justifyContent controls how they align vertically.
        justifyContent: "flex-end",
    },
};
export const justifyContentSpaceBetween = {
    container: {
        // justifyContent aligns children in the main direction.
        // For example, if children are flowing vertically, justifyContent controls how they align vertically.
        justifyContent: "space-between",
    },
};
export const justifyContentSpaceAround = {
    container: {
        // justifyContent aligns children in the main direction.
        // For example, if children are flowing vertically, justifyContent controls how they align vertically.
        justifyContent: "space-around",
    },
};
export const justifyContentSpaceEvenly = {
    container: {
        // justifyContent aligns children in the main direction.
        // For example, if children are flowing vertically, justifyContent controls how they align vertically.
        justifyContent: "space-evenly",
    },
};
export const alignChildrenStart = {
    container: {
        // alignItems aligns children in the cross direction.
        // For example, if children are flowing vertically, alignItems controls how they align horizontally.
        alignItems: "flex-start",
    },
};
export const alignChildrenCenter = {
    container: {
        // alignItems aligns children in the cross direction.
        // For example, if children are flowing vertically, alignItems controls how they align horizontally.
        alignItems: "center",
    },
};
export const alignChildrenEnd = {
    container: {
        // alignItems aligns children in the cross direction.
        // For example, if children are flowing vertically, alignItems controls how they align horizontally.
        alignItems: "flex-end",
    },
};
export const alignChildrenStretch = {
    container: {
        // alignItems aligns children in the cross direction.
        // For example, if children are flowing vertically, alignItems controls how they align horizontally.
        alignItems: "stretch",
    },
};
export const alignChildrenBaseline = {
    container: {
        // alignContent aligns children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "baseline",
    },
};
export const alignContentStart = {
    container: {
        // alignContent aligns rows of children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "flex-start",
    },
};
export const alignContentCenter = {
    container: {
        // alignContent aligns rows of children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "center",
    },
};
export const alignContentEnd = {
    container: {
        // alignContent aligns rows of children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "flex-end",
    },
};
export const alignContentStretch = {
    container: {
        // alignContent aligns rows of children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "stretch",
    },
};
export const alignContentSpaceAround = {
    container: {
        // alignContent aligns rows of children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "space-around",
    },
};
export const alignContentSpaceBetween = {
    container: {
        // alignContent aligns rows of children in the cross direction.
        // For example, if children are flowing vertically, alignContent controls how they align horizontally.
        alignContent: "space-between",
    },
};
export const alignSelfStart = {
    container: {
        // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
        alignSelf: "flex-start",
    },
};
export const alignSelfCenter = {
    container: {
        // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
        alignSelf: "center",
    },
};
export const alignSelfEnd = {
    container: {
        // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
        alignSelf: "flex-end",
    },
};
export const alignSelfStretch = {
    container: {
        // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
        alignSelf: "stretch",
    },
};
export const alignSelfBaseline = {
    container: {
        // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
        alignSelf: "baseline",
    },
};
