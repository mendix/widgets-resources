import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "@mendix/piw-utils-internal/components/web";
import { OpenOnEnum, RenderEnum } from "../../typings/TooltipProps";
import { Placement } from "@popperjs/core/lib/enums";
import { usePopper } from "react-popper";
import classNames from "classnames";

export interface TooltipProps {
    name?: string;
    class?: string;
    style?: CSSProperties;
    tabIndex?: number;
    trigger: ReactNode;
    render: RenderEnum;
    content: ReactNode;
    tooltipString?: string;
    position: Placement;
    openOn: OpenOnEnum;
    preview?: boolean;
}

export const Tooltip = (props: TooltipProps): ReactElement => {
    const { trigger, tooltipString, content, openOn, position, preview, render } = props;
    const componentReference = useRef<HTMLDivElement | null>(null);
    const [showTooltip, setShowTooltip] = useState(preview ?? false);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: position,
        modifiers: [
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                    padding: 5
                }
            },
            // TODO should this property be dynamic? Ask Chris!
            { name: "offset", options: { offset: [0, 8] } }
        ]
    });

    useOnClickOutside([componentReference], () => setShowTooltip(false));

    const onHover = useCallback((show: boolean) => setShowTooltip(show), []);

    const onClick = useCallback((show: boolean) => setShowTooltip(!show), []);

    const renderTrigger = (): ReactElement => {
        let eventContainer;
        switch (openOn) {
            case "click":
                eventContainer = {
                    onClick: () => onClick(showTooltip)
                };
                break;
            case "hover":
                eventContainer = {
                    onMouseEnter: () => onHover(true),
                    onMouseLeave: () => onHover(false)
                };
                break;
            case "hoverFocus":
                eventContainer = {
                    onMouseEnter: () => onHover(true),
                    onMouseLeave: () => onHover(false),
                    onFocus: () => onHover(true),
                    onBlur: () => onHover(false)
                };
                break;
        }
        return (
            <div
                className={"widget-tooltip-trigger"}
                data-testid={"trigger"}
                ref={setReferenceElement}
                {...eventContainer}
            >
                {trigger}
            </div>
        );
    };

    const renderContent = (): ReactNode => {
        return showTooltip ? (
            <div
                className={"widget-tooltip"}
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                role={"tooltip"}
            >
                {render === "text" ? tooltipString : content}
                <div
                    className={"widget-tooltip-arrow"}
                    ref={setArrowElement}
                    style={styles.arrow}
                    {...attributes.arrow}
                />
            </div>
        ) : null;
    };
    return (
        <div className={classNames(props.class, "widget-tooltip-container")} ref={componentReference}>
            {renderTrigger()}
            {renderContent()}
        </div>
    );
};
