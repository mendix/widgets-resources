import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import StarRating from "react-native-star-rating";

import { RatingProps } from "../typings/RatingProps";
import { defaultRatingStyle, RatingStyle, StarStyle } from "./ui/Styles";
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
    private readonly starStyle: StarStyle;

    constructor(props: RatingProps<RatingStyle>) {
        super(props);

        const { color, selectedColor, size, starStyle } = this.processStyles(this.styles);
        const iconConfigurations: IconConfiguration[] = [
            { name: fullIcon, size, color: selectedColor },
            { name: emptyIcon, size, color }
        ];

        this.starStyle = starStyle;

        preloadIcons(iconConfigurations).then(imageSourceCache => this.setState({ imageSourceCache }));
    }

    render(): JSX.Element | null {
        return this.state.imageSourceCache ? (
            <StarRating
                rating={Number(this.props.rating.value)}
                maxStars={this.props.maximumValue}
                disabled={this.props.editable === "never" || this.props.rating.readOnly}
                {...(this.props.animation !== "none" ? { animation: this.props.animation } : {})}
                selectedStar={this.onChangeHandler}
                halfStarEnabled={false}
                iconSet={undefined}
                containerStyle={this.styles.container}
                starStyle={this.starStyle}
                fullStar={this.state.imageSourceCache[fullIcon]}
                emptyStar={this.state.imageSourceCache[emptyIcon]}
            />
        ) : null;
    }

    private onChange(rating: number): void {
        if (this.props.rating.status === ValueStatus.Available) {
            this.props.rating.setTextValue(String(rating));

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }

    processStyles(styles: RatingStyle): any {
        const keys: Array<keyof StarStyle> = ["color", "selectedColor", "size"];
        const { selectedColor, color, size }: StarStyle = styles.star;

        const starStyle = {
            ...styles.star,
            width: size,
            height: size
        };

        keys.forEach(key => delete starStyle[key]);

        return {
            color,
            selectedColor,
            size,
            starStyle
        };
    }
}
