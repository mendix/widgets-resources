import { ClassAttributes, DOMAttributes, ReactNode, DOMElement } from "react";

declare module "react" {
    // Allow children to be null
    interface DOMFactory<P extends DOMAttributes<T>, T extends Element> {
        (props?: P & ClassAttributes<T>, ...children: (ReactNode|null)[]): DOMElement<P, T>;
    }
}