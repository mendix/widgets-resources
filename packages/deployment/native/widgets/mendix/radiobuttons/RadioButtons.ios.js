import { Component, createElement } from 'react';
import { View, Text } from 'react-native';

// const defaultStyle: RadioItemCustomStyle = {
//     buttonContainerStyle: {},
//     itemContainerStyle: {},
//     textStyle: {}
// };
class RadioButton extends Component {
    render() {
        return (createElement(View, null,
            createElement(Text, null, this.props.title)));
    }
}

// const defaultStyle: style = {};
function RadioButtons(props) {
    console.error(props);
    // const styles = mergeNativeStyles(defaultStyle, props.style);
    return createElement(RadioButton, { active: true, title: "title" });
}

export { RadioButtons };
