import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "@mendix/piw-utils-internal/components/web";
import { Placement } from "@popperjs/core/lib/enums";
import { usePopper } from "react-popper";
import classNames from "classnames";
import { OpenOnEnum, RenderMethodEnum } from "../../typings/TooltipProps";

export interface TooltipProps {
    name?: string;
    class?: string;
    style?: CSSProperties;
    tabIndex?: number;
    trigger: ReactNode;
    renderMethod: RenderMethodEnum;
    htmlMessage: ReactNode;
    textMessage?: string;
    position: Placement;
    openOn: OpenOnEnum;
    preview?: boolean;
}

export const Tooltip = (props: TooltipProps): ReactElement => {
    const { trigger, htmlMessage, textMessage, openOn, position, preview, renderMethod } = props;
    const componentReference = useRef<HTMLDivElement | null>(null);
    const [showTooltip, setShowTooltip] = useState(preview ?? false);
    const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(triggerElement, popperElement, {
        placement: position,
        modifiers: [
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                    padding: 5
                }
            },
            { name: "offset", options: { offset: [0, 8] } }
        ]
    });

    useOnClickOutside([componentReference], () => setShowTooltip(false));

    const onShow = useCallback(() => setShowTooltip(true), []);
    const onHide = useCallback(() => setShowTooltip(false), []);
    const onToggle = useCallback(() => setShowTooltip(!showTooltip), [showTooltip]);

    const renderTrigger = (): ReactElement => {
        let eventContainer;
        switch (openOn) {
            case "click":
                eventContainer = {
                    onClick: onToggle
                };
                break;
            case "hover":
                eventContainer = {
                    onMouseEnter: onShow,
                    onMouseLeave: onHide
                };
                break;
            case "hoverFocus":
                eventContainer = {
                    onMouseEnter: onShow,
                    onMouseLeave: onHide,
                    onFocus: onShow,
                    onBlur: onHide
                };
                break;
        }
        return (
            <div className="widget-tooltip-trigger" data-testid="trigger" ref={setTriggerElement} {...eventContainer}>
                {trigger}
            </div>
        );
    };

    const renderTooltip = (): ReactNode => {
        return showTooltip ? (
            <div
                className="widget-tooltip-content"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                role="tooltip"
            >
                {renderMethod === "text" ? textMessage : htmlMessage}
                <div
                    className="widget-tooltip-arrow"
                    ref={setArrowElement}
                    style={styles.arrow}
                    {...attributes.arrow}
                />
            </div>
        ) : null;
    };
    return (
        <div
            className={classNames(props.class, "widget-tooltip", `widget-tooltip-${position}`)}
            ref={componentReference}
        >
            {renderTrigger()}
            {renderTooltip()}
        </div>
    );
};
