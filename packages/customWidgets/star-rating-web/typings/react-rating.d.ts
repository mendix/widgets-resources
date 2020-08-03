declare module "react-rating" {
    interface RateProps {
        start?: number;
        stop?: number;
        step?: number;
        placeholderRate?: number;
        initialRate?: number;
        empty?: Array<string | object | React.ReactElement<any>> | string | object;
        placeholder?: Array<string | object | React.ReactElement<any>> | string | object;
        full?: Array<string | object | React.ReactElement<any>> | string | object;
        readonly?: boolean;
        quiet?: boolean;
        fractions?: number;
        // Called when the selected rate is changed.
        onChange?: (rate: number) => void;
        // Called when a rate is clicked.
        onClick?: (rate: number, e: Event) => void;
        // Called when a rate is entered or left. When a rate is left it is called with undefined.
        onRate?: (rate: number) => void;
    }
    const Rating: React.ComponentClass<RateProps>;

    export = Rating;
}

declare module "*.scss";
