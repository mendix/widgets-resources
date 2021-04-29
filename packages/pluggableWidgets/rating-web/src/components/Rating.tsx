import { createElement, CSSProperties, ReactElement, useState } from "react";
import classNames from "classnames";

export interface RatingProps {
    animated: boolean;
    className?: string;
    disabled: boolean;
    emptyIcon: ReactElement;
    fullIcon: ReactElement;
    maximumValue: number;
    onChange?: (value: number) => void;
    style?: CSSProperties;
    tabIndex?: number;
    value: number;
}

export function Rating(props: RatingProps): ReactElement {
    const [hover, setHover] = useState<undefined | number>(undefined);
    const onClickAction = !props.disabled
        ? (currentIndex: number): void => {
              if (props.value === currentIndex) {
                  props.onChange?.(0);
              } else {
                  props.onChange?.(currentIndex);
              }
          }
        : undefined;

    return (
        <div
            className={classNames("widget-rating", props.className)}
            data-focusindex={props.tabIndex ?? 0}
            role="radiogroup"
            style={props.style}
        >
            {Array.from({ length: props.maximumValue }, (_, index) => {
                const currentIndex = index + 1;
                return (
                    <div
                        aria-checked={currentIndex === props.value}
                        aria-label={currentIndex.toString()}
                        className={classNames("rating-item", { disabled: props.disabled })}
                        key={`icon_${currentIndex}`}
                        onClick={() => {
                            setHover(undefined);
                            onClickAction?.(currentIndex);
                        }}
                        onKeyDown={event => {
                            if (event.key === " " || event.key === "Enter") {
                                onClickAction?.(currentIndex);
                            }
                        }}
                        onMouseOut={() => {
                            setHover(undefined);
                        }}
                        onMouseOver={() => {
                            if (!props.disabled && props.animated) {
                                setHover(currentIndex);
                            }
                        }}
                        role="radio"
                        tabIndex={0}
                    >
                        {Number(currentIndex) <= props.value ? (
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
