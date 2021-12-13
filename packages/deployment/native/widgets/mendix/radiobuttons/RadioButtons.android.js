import { Component, createElement } from 'react';
import { View, Text } from 'react-native';

const styles = {
    containerStyle: {
        padding: 10
    },
    radioItemContainerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    circularBtnStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray"
    },
    activeBtnStyle: {
        borderColor: "blue"
    }
};

// const defaultStyle: RadioItemCustomStyle = {
//     buttonContainerStyle: {},
//     itemContainerStyle: {},
//     textStyle: {}
// };
class RadioButton extends Component {
    render() {
        return (createElement(View, { style: styles.radioItemContainerStyle },
            createElement(Text, null, this.props.title),
            createElement(View, { style: [styles.circularBtnStyle, this.props.active && styles.activeBtnStyle] })));
    }
}

// const defaultStyle: style = {};
function RadioButtons(props) {
    var _a;
    console.error(props);
    // const styles = mergeNativeStyles(defaultStyle, props.style);
    return (createElement(View, { style: styles.containerStyle }, (_a = props.enum.universe) === null || _a === void 0 ? void 0 : _a.map(title => (createElement(RadioButton, { active: props.enum.displayValue === title, title: title })))));
}

export { RadioButtons };
