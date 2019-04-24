import { actionValue, dynamicValue } from "@native-components/util-widgets/test";
import { createElement } from "react";
import { View } from "react-native";
import { render } from "react-native-testing-library";
import { ReactTestInstance } from "react-test-renderer";

import { Props, WebView } from "../WebView";

describe("WebView", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            style: [],
            url: dynamicValue("https://mendix.com")
        };
    });

    it("renders a web view when a url is provided", () => {
        const component = render(<WebView {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders a web view when html content is provided", () => {
        const component = render(<WebView {...defaultProps} content={dynamicValue("Hello, world!")} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders an error when no url or content is provided", () => {
        const component = render(<WebView {...defaultProps} url={dynamicValue()} content={dynamicValue()} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("executes the on load action", () => {
        const onLoadAction = actionValue();
        const component = render(<WebView {...defaultProps} onLoad={onLoadAction} />);

        const child = component.getByType(View).props.children[0] as ReactTestInstance;
        child.props.onLoad();

        expect(onLoadAction.execute).toHaveBeenCalledTimes(1);
    });

    it("executes the on error action", () => {
        const onErrorAction = actionValue();
        const component = render(<WebView {...defaultProps} onError={onErrorAction} />);

        const child = component.getByType(View).props.children[0] as ReactTestInstance;
        child.props.onError();

        expect(onErrorAction.execute).toHaveBeenCalledTimes(1);
    });
});
