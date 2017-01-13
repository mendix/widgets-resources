// declare module "react-rating" {
//     // interface Rating  extends Component<P, S> { }
//     export = Rating;
// }

interface RateProps {
    start?: number,
    stop?: number,
    step?: number,
    placeholderRate?: number,
    initialRate?: number,
    empty?: Array<string | Object | React.ReactElement<any>> | string | Object,
    placeholder?: Array<string | Object | React.ReactElement<any>> | string | Object,
    full?: Array<string | Object | React.ReactElement<any>> | string | Object,
    readonly?: boolean,
    quiet?: boolean,
    fractions?: number,
    onChange?: Function,
    onClick?: Function,
    onRate?: Function
}

declare var Rating: React.ComponentClass<RateProps>;
//declare var Rating: React.ReactInstance;
declare module 'react-rating'{
    export = Rating
}