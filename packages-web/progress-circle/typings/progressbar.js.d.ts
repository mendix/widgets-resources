// tslint:disable no-namespace
declare namespace progressbar {

    export class Circle {
        path: SVGPathElement;
        trail: SVGPathElement;
        text: HTMLDivElement;

        constructor(node: React.ReactNode, options?: CircleOptions);

        setText(text: string): void;
        animate(circleFraction: number): void;
        destroy(): void;
        value(): void;
    }

    interface CircleOptions {
        color?: string;
        trailColor?: string;
        trailWidth?: number;
        strokeWidth: number; // For IE & Edge support, shouldn't be over 6
        fill?: string;
        duration?: number;
    }
}

declare module "progressbar.js" {
    export = progressbar;
}
