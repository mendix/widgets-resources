// this file has been copied from https://github.com/djchie/react-native-star-rating here since the original library
// has an outdated dependency (RN-vector-icons) that we now managed here in this widget.
import { Component, createElement } from "react";
import { GestureResponderEvent, Image, ImageStyle, ImageURISource, StyleSheet } from "react-native";
import type { StarRatingProps } from "react-native-star-rating";

import Button from "react-native-button";
import EntypoIcons from "react-native-vector-icons/Entypo";
import EvilIconsIcons from "react-native-vector-icons/EvilIcons";
import FeatherIcons from "react-native-vector-icons/Feather";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import FoundationIcons from "react-native-vector-icons/Foundation";
import IoniconsIcons from "react-native-vector-icons/Ionicons";
import MaterialIconsIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OcticonsIcons from "react-native-vector-icons/Octicons";
import ZocialIcons from "react-native-vector-icons/Zocial";
import SimpleLineIconsIcons from "react-native-vector-icons/SimpleLineIcons";

declare type Option<T> = T | undefined;

export const iconSets = {
    Entypo: EntypoIcons,
    EvilIcons: EvilIconsIcons,
    Feather: FeatherIcons,
    FontAwesome: FontAwesomeIcons,
    Foundation: FoundationIcons,
    Ionicons: IoniconsIcons,
    MaterialIcons: MaterialIconsIcons,
    MaterialCommunityIcons: MaterialCommunityIconsIcons,
    Octicons: OcticonsIcons,
    Zocial: ZocialIcons,
    SimpleLineIcons: SimpleLineIconsIcons
};

interface Props
    extends Pick<
        StarRatingProps,
        "activeOpacity" | "buttonStyle" | "disabled" | "halfStarEnabled" | "iconSet" | "reversed" | "starStyle"
    > {
    starSize: number;
    rating: number;
    iconSet: keyof typeof iconSets;
    onStarButtonPress: (rating: number) => void;
    starColor: Option<string>;
    starIconName: Option<string | ImageURISource>;
}

const defaultProps = {
    buttonStyle: {},
    starStyle: {}
} as Partial<Props>;

class StarButton extends Component<Props> {
    static defaultProps: Partial<Props>;
    constructor(props: Props) {
        super(props);

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress(event: GestureResponderEvent) {
        const { halfStarEnabled, starSize, rating, onStarButtonPress } = this.props;

        let addition = 0;

        if (halfStarEnabled) {
            const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
            addition = isHalfSelected ? -0.5 : 0;
        }

        onStarButtonPress(rating + addition);
    }

    iconSetFromProps() {
        return iconSets[this.props.iconSet];
    }

    renderIcon() {
        const { reversed, starColor, starIconName, starSize, starStyle } = this.props;
        const Icon = this.iconSetFromProps();
        const newStarStyle = {
            transform: [
                {
                    scaleX: reversed ? -1 : 1
                }
            ],
            ...StyleSheet.flatten(starStyle)
        } as ImageStyle;

        return typeof starIconName === "string" ? (
            <Icon name={starIconName} size={starSize} color={starColor} style={newStarStyle} />
        ) : starIconName ? (
            <Image
                source={starIconName}
                style={[
                    {
                        width: starSize,
                        height: starSize,
                        resizeMode: "contain"
                    } as ImageStyle,
                    newStarStyle
                ]}
            />
        ) : null;
    }

    render() {
        const { activeOpacity, buttonStyle, disabled } = this.props;

        return (
            <Button
                activeOpacity={activeOpacity}
                disabled={disabled}
                containerStyle={buttonStyle}
                onPress={this.onButtonPress}
            >
                {this.renderIcon()}
            </Button>
        );
    }
}

StarButton.defaultProps = defaultProps;

export default StarButton;
