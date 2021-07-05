import { createElement, ReactElement } from "react";

export interface HeaderProps {
    heading: "headingOne" | "headingTwo" | "headingThree" | "headingFour" | "headingFive" | "headingSix";
    text?: string;
}

export function Header(props: HeaderProps): ReactElement {
    let header;

    switch (props.heading) {
        case "headingOne":
            header = <h1>{props.text}</h1>;
            break;
        case "headingTwo":
            header = <h2>{props.text}</h2>;
            break;
        case "headingThree":
            header = <h3>{props.text}</h3>;
            break;
        case "headingFour":
            header = <h4>{props.text}</h4>;
            break;
        case "headingFive":
            header = <h5>{props.text}</h5>;
            break;
        case "headingSix":
            header = <h6>{props.text}</h6>;
            break;
    }

    return header;
}
