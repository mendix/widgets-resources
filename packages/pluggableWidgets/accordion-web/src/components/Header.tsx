import { createElement, PropsWithChildren, ReactElement } from "react";

export interface HeaderProps {
    heading: "headingOne" | "headingTwo" | "headingThree" | "headingFour" | "headingFive" | "headingSix";
}

export function Header(props: PropsWithChildren<HeaderProps>): ReactElement {
    let Header: keyof JSX.IntrinsicElements = "h1";

    switch (props.heading) {
        case "headingTwo":
            Header = "h2";
            break;
        case "headingThree":
            Header = "h3";
            break;
        case "headingFour":
            Header = "h4";
            break;
        case "headingFive":
            Header = "h5";
            break;
        case "headingSix":
            Header = "h6";
            break;
    }

    return <Header>{props.children}</Header>;
}
