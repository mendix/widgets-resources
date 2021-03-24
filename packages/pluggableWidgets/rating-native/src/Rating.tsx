import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { executeAction } from "@mendix/piw-utils-internal";
import { ValueStatus } from "mendix";
import { Component, createElement } from "react";
import StarRating from "react-native-star-rating";
import { Big } from "big.js";

import { RatingProps } from "../typings/RatingProps";
import { defaultRatingStyle, IconStyle, RatingStyle } from "./ui/Styles";
import { IconConfiguration, ImageSourcesCache, preloadIcons } from "./utils/fonts/font";

interface State {
    imageSourceCache?: ImageSourcesCache;
}

const fullIcon = "glyphicon-star";
const emptyIcon = "glyphicon-star-empty";

export class Rating extends Component<RatingProps<RatingStyle>, State> {
    readonly state: State = {};

    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultRatingStyle, this.props.style);
    private readonly iconStyle: IconStyle;
    private readonly usesGlyphicons: boolean;

    constructor(props: RatingProps<RatingStyle>) {
        super(props);

        const { color, selectedColor, size, iconStyle } = processStyles(this.styles);
        const iconConfigurations: IconConfiguration[] = [
            { name: fullIcon, size, color: selectedColor },
            { name: emptyIcon, size, color }
        ];

        this.iconStyle = iconStyle;

        this.usesGlyphicons = !props.icon || !props.icon.value || !props.emptyIcon || !props.emptyIcon.value;
        if (this.usesGlyphicons) {
            // tslint:disable-next-line:no-floating-promises
            preloadIcons(iconConfigurations).then(imageSourceCache => this.setState({ imageSourceCache }));
        }
    }

    render(): JSX.Element | null {
        if (!this.state.imageSourceCache && this.usesGlyphicons) {
            return null;
        }

        const ratingProps = {
            activeOpacity: 1, // Waiting PR to merge properties in JSX https://github.com/DefinitelyTyped/DefinitelyTyped/pull/34397
            ...(this.props.animation !== "none" ? { animation: this.props.animation } : {})
        };

        const disabled = this.props.editable === "never" || this.props.ratingAttribute.readOnly;
        const containerStyle = disabled
            ? [this.styles.container, this.styles.containerDisabled]
            : this.styles.container;

        return (
            <StarRating
                maxStars={this.props.maximumValue}
                rating={Math.round(Number(this.props.ratingAttribute.value))}
                disabled={disabled}
                selectedStar={this.onChangeHandler}
                halfStarEnabled={false}
                iconSet={undefined}
                containerStyle={containerStyle}
                starStyle={this.iconStyle}
                fullStar={this.props.icon ? (this.props.icon.value as any) : this.state.imageSourceCache![fullIcon]}
                emptyStar={
                    this.props.emptyIcon ? (this.props.emptyIcon.value as any) : this.state.imageSourceCache![emptyIcon]
                }
                {...ratingProps}
            />
        );
    }

    private onChange(rating: number): void {
        if (this.props.ratingAttribute.status === ValueStatus.Available) {
            this.props.ratingAttribute.setValue(new Big(rating));
            executeAction(this.props.onChange);
        }
    }
}

function processStyles(styles: RatingStyle): any {
    const keys: Array<keyof IconStyle> = ["color", "selectedColor", "size"];
    const { selectedColor, color, size }: IconStyle = styles.icon;

    const iconStyle = {
        ...styles.icon,
        width: size,
        height: size
    };

    keys.forEach(key => delete iconStyle[key]);

    return {
        color,
        selectedColor,
        size,
        iconStyle
    };
}
