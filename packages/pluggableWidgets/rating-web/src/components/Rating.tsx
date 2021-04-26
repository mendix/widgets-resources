import { createElement, CSSProperties, ReactElement, useState } from "react";
import classNames from "classnames";

export interface RatingProps {
    className?: string;
    disabled: boolean;
    value: number;
    maximumValue: number;
    onChange?: (value: number) => void;
    animated: boolean;
    emptyIcon: ReactElement;
    fullIcon: ReactElement;
    style?: CSSProperties;
}

export function Rating(props: RatingProps): ReactElement {
    const [value, setValue] = useState(props.value ?? 0);
    const [hover, setHover] = useState<undefined | number>(undefined);
    const onClickAction = !props.disabled
        ? (currentIndex: number): void => {
              // TODO: Allows reset rating
              if (value === currentIndex) {
                  setValue(0);
                  props.onChange?.(0);
              } else {
                  setValue(currentIndex);
                  props.onChange?.(currentIndex);
              }
          }
        : undefined;
    return (
        <div
            className={classNames("widget-rating", props.className)}
            style={props.style}
            data-focusindex={0}
            role="radiogroup"
        >
            {Array.from({ length: props.maximumValue }, (_, index) => {
                const currentIndex = index + 1;
                return (
                    <div
                        role="radio"
                        aria-checked={currentIndex === value}
                        aria-label={currentIndex.toString()}
                        tabIndex={0}
                        className={classNames("rating-item", { disabled: props.disabled })}
                        key={`icon_${currentIndex}`}
                        onKeyDown={event =>
                            event.key === " " || event.key === "Enter" ? onClickAction?.(currentIndex) : undefined
                        }
                        onClick={() => {
                            setHover(undefined);
                            onClickAction?.(currentIndex);
                        }}
                        onMouseOver={() => {
                            if (!props.disabled && props.animated) {
                                setHover(currentIndex);
                            }
                        }}
                        onMouseOut={() => {
                            setHover(undefined);
                        }}
                    >
                        {Number(currentIndex) <= value ? (
                            props.fullIcon
                        ) : hover && currentIndex <= Number(hover) ? (
                            <div className="rating-item-hover">{props.fullIcon}</div>
                        ) : (
                            props.emptyIcon
                        )}
                    </div>
                );
            })}
        </div>
    );
}
