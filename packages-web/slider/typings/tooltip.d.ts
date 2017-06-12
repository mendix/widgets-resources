/* tslint:disable */
declare module "rc-tooltip" {
    type Trigger = "hover" | "click" | "focus";
    type Placement =
        "left" | "right" | "top" | "bottom" |
        "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

    interface TooltipProps extends React.Props<any> {
        overlayClassName?: string;
        trigger?: Trigger[];
        mouseEnterDelay?: number;
        mouseLeaveDelay?: number;
        overlayStyle?: React.CSSProperties;
        prefixCls?: string;
        transitionName?: string;
        onVisibleChange?: () => void;
        visible?: boolean;
        defaultVisible?: boolean;
        placement?: Placement | Object;
        align?: Object;
        onPopupAlign?: (popupDomNode: Element, align: Object) => void;
        overlay: React.ReactElement<any> | (() => React.ReactElement<any>);
        arrowContent?: React.ReactNode;
        getTooltipContainer?: () => Element;
        destroyTooltipOnHide?: boolean;
    }

    export default class Tooltip extends React.Component<TooltipProps, {}> { }
}
