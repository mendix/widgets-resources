import { createElement } from "react";
import { shallow } from "enzyme";
import { Platform } from "react-native";

import { HelloWorld, HelloWorldProps } from "../HelloWorld";

describe.each(["ios", "android"])("HelloWorld for %s", (os: "ios" | "android") => {
    beforeEach(() => {
        Platform.OS = os;
        Platform.select = jest.fn((dict: any) => dict[Platform.OS]);
    });

    it("renders the structure correctly", () => {
        const helloWorldProps: HelloWorldProps = {
            name: "Mendix",
            style: []
        };
        const helloWorld = shallow(<HelloWorld {...helloWorldProps} />);

        expect(helloWorld).toMatchSnapshot();
    });

    it("renders the structure correctly with custom style", () => {
        const helloWorldProps: HelloWorldProps = {
            name: "Mendix",
            style: [{ container: { borderColor: "white" }, label: { color: "black" } }]
        };
        const helloWorld = shallow(<HelloWorld {...helloWorldProps} />);

        expect(helloWorld).toMatchSnapshot();
    });
});
