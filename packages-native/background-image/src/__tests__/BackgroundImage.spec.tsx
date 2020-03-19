import { createElement } from "react";
import { Text } from "react-native";
import { render } from "react-native-testing-library";
import { dynamicValue } from "@native-mobile-resources/util-widgets";

import { BackgroundImage } from "../BackgroundImage";
import { BackgroundImageProps } from "../../typings/BackgroundImageProps";
import { BackgroundImageStyle } from "../ui/Styles";
import { NativeImage } from "mendix";

jest.mock("mendix/components/native/Image", () => require.requireActual("./__mocks__/mendix/components/native/Image"));

const defaultProps: BackgroundImageProps<BackgroundImageStyle> = {
    name: "backgroundImageTest",
    style: [],
    image: dynamicValue<NativeImage>(false, { uri: "path/to/image" }),
    imageResizeMode: "cover",
    content: <Text>Content</Text>
};

describe("BackgroundImage", () => {
    it("renders with default styles", () => {
        const component = render(<BackgroundImage {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styles", () => {
        const style: BackgroundImageStyle[] = [
            {
                container: { height: "50%" },
                image: { width: "100%", height: "100%" }
            },
            {
                container: { height: "80%" },
                image: {}
            }
        ];

        const component = render(<BackgroundImage {...defaultProps} style={style} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders nothing when image is loading for the first time", () => {
        const image = dynamicValue<NativeImage>(true);

        const component = render(<BackgroundImage {...defaultProps} image={image} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders previous image when image is reloading", () => {
        const image = dynamicValue<NativeImage>(true, { uri: "path/to/image" });

        const component = render(<BackgroundImage {...defaultProps} image={image} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders nothing when image is unavailable", () => {
        const image = dynamicValue<NativeImage>(false);

        const component = render(<BackgroundImage {...defaultProps} image={image} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders wihtout content", () => {
        const content = null;

        const component = render(<BackgroundImage {...defaultProps} content={content} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
