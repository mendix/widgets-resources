import { createElement } from "react";
import { Text } from "react-native";
import { render } from "react-native-testing-library";
import { dynamicValue } from "@native-mobile-resources/util-widgets";

import { BackgroundImage } from "../BackgroundImage";
import { BackgroundImageProps } from "../../typings/BackgroundImageProps";
import { BackgroundImageStyle } from "../ui/Styles";

const defaultProps: BackgroundImageProps<BackgroundImageStyle> = {
    name: "backgroundImageTest",
    style: [],
    backgroundImage: dynamicValue({ uri: "path/to/image" }),
    content: <Text>Content</Text>
};

describe("BackgroundImage", () => {
    it("renders with default styles", () => {
        //@ts-ignore
        const component = render(<BackgroundImage {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styles", () => {
        const style = [
            {
                container: { height: "50%" }
            },
            {
                container: { height: "80%" }
            }
        ];

        //@ts-ignore
        const component = render(<BackgroundImage {...defaultProps} style={style} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders nothing when image is unavailable", () => {
        const backgroundImage = dynamicValue();

        //@ts-ignore
        const component = render(<BackgroundImage {...defaultProps} backgroundImage={backgroundImage} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders wihtout content", () => {
        const content = null;

        //@ts-ignore
        const component = render(<BackgroundImage {...defaultProps} content={content} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
