import { createElement, CSSProperties, ReactElement, useRef, useState } from "react";
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

const enum Direction {
    PREVIOUS = "previous",
    NEXT = "next"
}

export function Rating(props: RatingProps): ReactElement {
    const [hover, setHover] = useState<undefined | number>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const onClickAction = !props.disabled
        ? (currentIndex: number): void => {
              if (props.value === currentIndex) {
                  props.onChange?.(0);
              } else {
                  props.onChange?.(currentIndex);
              }
          }
        : undefined;

    const focusItem = (direction: Direction): void => {
        if (containerRef.current) {
            const currentFocusedElement = containerRef.current.querySelector(".rating-item:focus");
            if (direction === Direction.NEXT && currentFocusedElement?.nextSibling) {
                (currentFocusedElement.nextSibling as HTMLDivElement).focus();
            } else if (direction === Direction.PREVIOUS && currentFocusedElement?.previousSibling) {
                (currentFocusedElement.previousSibling as HTMLDivElement).focus();
            }
        }
    };

    return (
        <div
            className={classNames("widget-rating", props.className)}
            data-focusindex={props.tabIndex ?? 0}
            role="radiogroup"
            style={props.style}
            onKeyDown={event => {
                switch (event.key) {
                    case "Left": // Microsoft Edge value
                    case "ArrowLeft":
                        event.preventDefault();
                        focusItem(Direction.PREVIOUS);
                        break;
                    case "Right": // Microsoft Edge value
                    case "ArrowRight":
                        event.preventDefault();
                        focusItem(Direction.NEXT);
                        break;
                }
            }}
            ref={containerRef}
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
                                event.preventDefault();
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
                        tabIndex={index === Math.max(props.value - 1, 0) ? 0 : -1}
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
