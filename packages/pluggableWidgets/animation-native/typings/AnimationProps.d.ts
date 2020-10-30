/**
 * This file was generated from Animation.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue } from "mendix";

export type AnimationTypeEnum = "in" | "attention" | "out";

export type AnimationInEnum = "none" | "bounceIn" | "bounceInDown" | "bounceInUp" | "bounceInLeft" | "bounceInRight" | "fadeIn" | "fadeInDown" | "fadeInDownBig" | "fadeInUp" | "fadeInUpBig" | "fadeInLeft" | "fadeInLeftBig" | "fadeInRight" | "fadeInRightBig" | "slideInDown" | "slideInUp" | "slideInLeft" | "slideInRight" | "zoomIn" | "zoomInDown" | "zoomInUp" | "zoomInLeft" | "zoomInRight";

export type AnimationAttentionEnum = "none" | "bounce" | "flash" | "pulse" | "rotate" | "rubberBand" | "shake" | "swing" | "tada" | "wobble";

export type AnimationOutEnum = "none" | "bounceOut" | "bounceOutDown" | "bounceOutUp" | "bounceOutLeft" | "bounceOutRight" | "fadeOut" | "fadeOutDown" | "fadeOutDownBig" | "fadeOutUp" | "fadeOutUpBig" | "fadeOutLeft" | "fadeOutLeftBig" | "fadeOutRight" | "fadeOutRightBig" | "slideOutDown" | "slideOutUp" | "slideOutLeft" | "slideOutRight" | "zoomOut" | "zoomOutDown" | "zoomOutUp" | "zoomOutLeft" | "zoomOutRight";

export type EasingEnum = "linear" | "ease" | "ease_in" | "ease_out" | "ease_in_out" | "ease_in_cubic" | "ease_out_cubic" | "ease_in_out_cubic" | "ease_in_circ" | "ease_out_circ" | "ease_in_out_circ" | "ease_in_expo" | "ease_out_expo" | "ease_in_out_expo" | "ease_in_quad" | "ease_out_quad" | "ease_in_out_quad" | "ease_in_quart" | "ease_out_quart" | "ease_in_out_quart" | "ease_in_quint" | "ease_out_quint" | "ease_in_out_quint" | "ease_in_sine" | "ease_out_sine" | "ease_in_out_sine" | "ease_in_back" | "ease_out_back" | "ease_in_out_back";

export type DirectionEnum = "normal" | "alternate";

export interface AnimationProps<Style> {
    name: string;
    style: Style[];
    content: ReactNode;
    animationType: AnimationTypeEnum;
    animationIn: AnimationInEnum;
    animationAttention: AnimationAttentionEnum;
    animationOut: AnimationOutEnum;
    duration: number;
    delay: number;
    condition?: DynamicValue<boolean>;
    easing: EasingEnum;
    count: number;
    direction: DirectionEnum;
    afterAnimationAction?: ActionValue;
}

export interface AnimationPreviewProps {
    class: string;
    style: string;
    content: { widgetCount: number; renderer: ComponentType };
    animationType: AnimationTypeEnum;
    animationIn: AnimationInEnum;
    animationAttention: AnimationAttentionEnum;
    animationOut: AnimationOutEnum;
    duration: number | null;
    delay: number | null;
    condition: string;
    easing: EasingEnum;
    count: number | null;
    direction: DirectionEnum;
    afterAnimationAction: {} | null;
}
