/**
 * This file was generated from Animation.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export type AnimationEnum = "bounce" | "flash" | "jello" | "pulse" | "rotate" | "rubberBand" | "shake" | "swing" | "tada" | "wobble" | "bounceIn" | "bounceInDown" | "bounceInUp" | "bounceInLeft" | "bounceInRight" | "bounceOut" | "bounceOutDown" | "bounceOutUp" | "bounceOutLeft" | "bounceOutRight" | "fadeIn" | "fadeInDown" | "fadeInDownBig" | "fadeInUp" | "fadeInUpBig" | "fadeInLeft" | "fadeInLeftBig" | "fadeInRight" | "fadeInRightBig" | "fadeOut" | "fadeOutDown" | "fadeOutDownBig" | "fadeOutUp" | "fadeOutUpBig" | "fadeOutLeft" | "fadeOutLeftBig" | "fadeOutRight" | "fadeOutRightBig" | "flipInX" | "flipInY" | "flipOutX" | "flipOutY" | "lightSpeedIn" | "lightSpeedOut" | "slideInDown" | "slideInUp" | "slideInLeft" | "slideInRight" | "slideOutDown" | "slideOutUp" | "slideOutLeft" | "slideOutRight" | "zoomIn" | "zoomInDown" | "zoomInUp" | "zoomInLeft" | "zoomInRight" | "zoomOut" | "zoomOutDown" | "zoomOutUp" | "zoomOutLeft" | "zoomOutRight";

export type EasingEnum = "linear" | "ease" | "ease_in" | "ease_out" | "ease_in_out" | "ease_in_cubic" | "ease_out_cubic" | "ease_in_out_cubic" | "ease_in_circ" | "ease_out_circ" | "ease_in_out_circ" | "ease_in_expo" | "ease_out_expo" | "ease_in_out_expo" | "ease_in_quad" | "ease_out_quad" | "ease_in_out_quad" | "ease_in_quart" | "ease_out_quart" | "ease_in_out_quart" | "ease_in_quint" | "ease_out_quint" | "ease_in_out_quint" | "ease_in_sine" | "ease_out_sine" | "ease_in_out_sine" | "ease_in_back" | "ease_out_back" | "ease_in_out_back";

export type DirectionEnum = "normal" | "reverse" | "alternate" | "alternate_reverse";

export interface AnimationProps<Style> extends CommonProps<Style> {
    content: any;
    animation: AnimationEnum;
    easing: EasingEnum;
    direction: DirectionEnum;
    duration: number;
    delay: number;
    count: number;
    condition?: DynamicValue<boolean>;
    afterAnimationAction?: ActionValue;
}
