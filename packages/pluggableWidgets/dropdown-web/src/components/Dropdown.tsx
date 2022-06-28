import { createElement, ReactElement } from "react";

export interface Props {
    className?: string;
}

export const Dropdown = (props: Props): ReactElement => {
    return <div className={props.className} />;
};
