import React, { Component } from "react";
import StarRating from "react-native-star-rating";
import { RatingProps } from "../typings/RatingProps";

export class Rating extends Component<RatingProps> {
    private readonly onChangeHandler = this.onChange.bind(this);

    render(): JSX.Element {
        return (
            <StarRating
                rating={Number(this.props.rating.value)}
                maxStars={this.props.maximumValue}
                disabled={this.props.editable === "never" || this.props.rating.readOnly}
                {...(this.props.animation !== "none" ? { animation: this.props.animation } : {})}
                starSize={this.props.iconSize}
                fullStarColor={this.props.fullStarColor}
                emptyStarColor={this.props.emptyStarColor}
                halfStarEnabled={this.props.halfStarEnabled}
                halfStarColor={this.props.fullStarColor}
                selectedStar={this.onChangeHandler}
                iconSet="Ionicons"
                emptyStar="md-star-outline"
                halfStar="md-star-half"
                fullStar="md-star"
            />
        );
    }

    private onChange(rating: number): void {
        if (this.props.rating.status === PluginWidget.ValueStatus.Available) {
            this.props.rating.setTextValue(String(rating));

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }
}
