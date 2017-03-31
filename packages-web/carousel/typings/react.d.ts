import { ClassAttributes, DOMAttributes, DOMElement, ReactElement, ReactNode, StatelessComponent } from "react";
// tslint:disable callable-types no-namespace
declare module "react" {
    // Allow children to be null
    interface DOMFactory<P extends DOMAttributes<T>, T extends Element> {
        (props?: P & ClassAttributes<T>, ...children: Array<ReactNode|null>): DOMElement<P, T>;
    }
}
