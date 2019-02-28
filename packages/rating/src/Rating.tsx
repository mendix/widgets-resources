import { Component, createElement } from "react";
import { Rating as RNRating } from "react-native-ratings";

import { RatingProps } from "../typings/RatingProps";

export class Rating extends Component<RatingProps> {
    private readonly onChangeHandler = this.onChange.bind(this);

    render(): JSX.Element {
        return (
            <RNRating
                type={this.props.icon}
                startingValue={Number(this.props.rating.value)}
                ratingCount={this.props.maximumValue}
                readonly={this.props.editable === "never" || this.props.rating.readOnly}
                imageSize={this.props.iconSize}
                onFinishRating={this.onChangeHandler}
                fractions={this.props.fractions}
            />
        );
    }

    private onChange(rating: number): void {
        if (this.props.rating.status === ValueStatus.Available) {
            this.props.rating.setTextValue(String(rating));

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }
}
