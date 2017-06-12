/* tslint:disable */
declare module "rc-slider" {
    export interface Marks {
        [value: number]: JSX.Element | string | { style: any, label: string | JSX.Element };
    }

    interface CommonApiProps {
        className?: string;
        min?: number;
        max?: number;
        marks?: Marks;
        step?: number;
        vertical?: boolean;
        included?: boolean;
        disabled?: boolean;
        dots?: boolean;
        tipTransitionName?: string;
        tipFormatter?: ((value: any) => any | undefined) | null;
        handle?(props: any): React.ReactNode;
        onBeforeChange?(value: any): any | undefined;
        onChange?(value: any): any | undefined;
        onAfterChange?(value: any): any | undefined;
    }

    interface SliderProps extends CommonApiProps {
        defaultValue?: number;
        value?: number;
    }

    interface RangeProps extends CommonApiProps {
        defaultValue?: number[];
        value?: number[];
        count?: number;
        allowCross?: boolean;
        pushable?: boolean;
    }

    interface HandleProps extends CommonApiProps {
        className: string;
        vertical: boolean;
        offset: number;
    }

    export class Range extends React.Component<RangeProps, {}> { }
    export class Handle extends React.Component<HandleProps, {}> { }
    export default class Slider extends React.Component<SliderProps, {}> { }
}
