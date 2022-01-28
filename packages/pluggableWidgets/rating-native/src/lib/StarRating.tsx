// this file has been copied from https://github.com/djchie/react-native-star-rating here since the original library
// has an outdated dependency (react-native-vector-icons) that we now managed here in this widget.
import { ClassicComponent, Component, createElement } from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import { AnimatableProperties, View as AnimatableView } from "react-native-animatable";
import type { StarRatingProps } from "react-native-star-rating";

import StarButton, { iconSets } from "./StarButton";

const ANIMATION_TYPES = [
    "bounce",
    "flash",
    "jello",
    "pulse",
    "rotate",
    "rubberBand",
    "shake",
    "swing",
    "tada",
    "wobble"
] as const;

const DEFAULT_RATING = 0;
const DEFAULT_MAX_RATING = 5;

const defaultProps = {
    activeOpacity: 0.2,
    animation: undefined,
    buttonStyle: {},
    containerStyle: {},
    disabled: false,
    emptyStar: "star-o",
    emptyStarColor: "gray",
    fullStar: "star",
    fullStarColor: "black",
    halfStar: "star-half-o",
    halfStarColor: undefined,
    halfStarEnabled: false,
    iconSet: "FontAwesome",
    maxStars: DEFAULT_MAX_RATING,
    rating: DEFAULT_RATING,
    reversed: false,
    starSize: 40,
    starStyle: {},
    selectedStar: undefined
};

interface Props extends StarRatingProps {
    iconSet: keyof typeof iconSets;
}

class StarRating extends Component<Props> {
    static defaultProps: typeof defaultProps;
    starRef: Array<ClassicComponent<AnimatableProperties<ViewStyle> & ViewProps, any> | null>;

    constructor(props: Props) {
        super(props);

        this.starRef = [];
        this.onStarButtonPress = this.onStarButtonPress.bind(this);
    }

    onStarButtonPress(rating: number) {
        const { selectedStar } = this.props;

        if (selectedStar) {
            selectedStar(rating);
        }
    }

    render() {
        const {
            activeOpacity,
            animation,
            buttonStyle,
            containerStyle,
            disabled,
            emptyStar,
            emptyStarColor,
            fullStar,
            fullStarColor,
            halfStar,
            halfStarColor,
            halfStarEnabled,
            iconSet,
            maxStars,
            rating,
            reversed,
            starSize,
            starStyle
        } = this.props;

        const newContainerStyle = {
            flexDirection: reversed ? "row-reverse" : "row",
            justifyContent: "space-between",
            ...StyleSheet.flatten(containerStyle)
        } as ViewStyle;

        // Round rating down to nearest .5 star
        let starsLeft = Math.round((rating ?? DEFAULT_RATING) * 2) / 2;
        const starButtons = [];

        for (let i = 0; i < (maxStars ?? DEFAULT_MAX_RATING); i++) {
            let starIconName = emptyStar;
            let finalStarColor = emptyStarColor;

            if (starsLeft >= 1) {
                starIconName = fullStar;
                finalStarColor = fullStarColor;
            } else if (starsLeft === 0.5) {
                starIconName = halfStar;
                if (halfStarColor) {
                    finalStarColor = halfStarColor;
                } else {
                    finalStarColor = fullStarColor;
                }
            }

            const starButtonElement = (
                <AnimatableView
                    key={i}
                    ref={node => {
                        this.starRef.push(node);
                    }}
                >
                    <StarButton
                        activeOpacity={activeOpacity}
                        buttonStyle={buttonStyle}
                        disabled={disabled}
                        halfStarEnabled={halfStarEnabled}
                        iconSet={iconSet}
                        onStarButtonPress={(rating: number) => {
                            if (animation && ANIMATION_TYPES.includes(animation)) {
                                for (let s = 0; s <= i; s++) {
                                    const component = this.starRef[s];
                                    if (component) {
                                        component[animation as keyof typeof component](1000 + s * 200);
                                    }
                                }
                            }
                            this.onStarButtonPress(rating);
                        }}
                        rating={i + 1}
                        reversed={reversed}
                        starColor={finalStarColor}
                        starIconName={starIconName}
                        starSize={starSize}
                        starStyle={starStyle}
                    />
                </AnimatableView>
            );

            starButtons.push(starButtonElement);
            starsLeft -= 1;
        }

        return (
            <View style={newContainerStyle} pointerEvents={disabled ? "none" : "auto"}>
                {starButtons}
            </View>
        );
    }
}

StarRating.defaultProps = defaultProps;

export default StarRating;
