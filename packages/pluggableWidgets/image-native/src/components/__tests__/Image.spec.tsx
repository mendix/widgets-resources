import { createElement } from "react";
import { Text } from "react-native";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { NativeIcon, NativeImage } from "mendix";
import { Style } from "@mendix/piw-native-utils-internal";
import { Image } from "../../Image";
import { actionValue, dynamicValue } from "@mendix/piw-utils-internal";
import { ImageProps } from "../../../typings/ImageProps";
import { parse, SvgAst } from "react-native-svg";
import svgXml from "./svgXml";
import { GlyphIcon } from "../fonts/font";

global.fetch = jest.fn(() =>
    Promise.resolve({
        ...global.fetch.prototype,
        url: "",
        ok: true,
        status: 200,
        statusText: "OK",
        redirected: false,
        json: () => Promise.resolve("FetchResponse"),
        text: () => svgXml
    })
);
jest.mock("react-native-svg/lib/commonjs/xml", () => {
    const original = jest.requireActual("react-native-svg/lib/commonjs/xml");
    return {
        ...original,
        SvgXml: jest.fn(props => {
            return <SvgAst ast={parse(svgXml)} override={props} />;
        }),
        SvgUri: jest.fn(props => {
            return <SvgAst ast={parse(svgXml)} override={props} />;
        })
    };
});
jest.mock("react-native/Libraries/Image/Image", () => {
    const original = jest.requireActual("react-native/Libraries/Image/Image");
    return {
        ...original,
        getSize: jest.fn((_uri, fn, _reject) => fn(2222, 1111)),
        resolveAssetSource: jest.fn((_param: number) => ({ width: 2222, height: 1111 }))
    };
});

const onLayoutEventData = {
    nativeEvent: {
        layout: {
            width: 9999,
            height: 9999
        }
    }
};

describe("Widget", () => {
    let imageProps: ImageProps<Style>;
    beforeEach(() => {
        imageProps = {
            name: "Image1",
            style: [],
            datasource: "image",
            imageObject: dynamicValue<number>(1),
            defaultImageDynamic: undefined,
            imageUrl: undefined,
            imageIcon: undefined,
            isBackgroundImage: false,
            children: null,
            resizeMode: "contain",
            opacity: 1,
            widthUnit: "auto",
            customWidth: 100,
            heightUnit: "auto",
            customHeight: 100,
            iconSize: 16,
            onClickType: "action",
            onClick: actionValue()
        };
    });

    describe("Static Image", () => {
        it("renders the structure", async () => {
            const ImageComponent = <Image {...imageProps} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom height", async () => {
            const ImageComponent = <Image {...imageProps} heightUnit={"points"} customHeight={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom width", async () => {
            const ImageComponent = <Image {...imageProps} widthUnit={"points"} customWidth={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure inside a modal", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"enlarge"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            fireEvent(image.getByTestId(`${imageProps.name}$ImageEnlargedPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("triggers the onclick action", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"action"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            expect(imageProps.onClick?.execute).toHaveBeenCalledTimes(1);
        });

        it("renders the structure as a background image", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with a different resizeMode", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage resizeMode={"cover"}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with 50% opacity", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage opacity={50}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });
    });

    describe("Static Image SVG", () => {
        beforeEach(() => {
            imageProps.imageObject = dynamicValue<string>(svgXml);
        });

        it("renders the structure", async () => {
            const ImageComponent = <Image {...imageProps} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom height", async () => {
            const ImageComponent = <Image {...imageProps} heightUnit={"points"} customHeight={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom width", async () => {
            const ImageComponent = <Image {...imageProps} widthUnit={"points"} customWidth={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure inside a modal", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"enlarge"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            fireEvent(image.getByTestId(`${imageProps.name}$ImageEnlargedPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("triggers the onclick action", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"action"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            expect(imageProps.onClick?.execute).toHaveBeenCalledTimes(1);
        });

        it("renders the structure as a background image", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with a different resizeMode", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage resizeMode={"cover"}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with 50% opacity", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage opacity={50}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });
    });

    describe("Dynamic Image", () => {
        beforeEach(() => {
            imageProps.imageObject = dynamicValue<NativeImage>({
                name: "image.png",
                uri: require("./image.png")
            });
        });

        it("renders the structure", async () => {
            const ImageComponent = <Image {...imageProps} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom height", async () => {
            const ImageComponent = <Image {...imageProps} heightUnit={"points"} customHeight={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom width", async () => {
            const ImageComponent = <Image {...imageProps} widthUnit={"points"} customWidth={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure inside a modal", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"enlarge"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            fireEvent(image.getByTestId(`${imageProps.name}$ImageEnlargedPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("triggers the onclick action", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"action"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent.press(image.getByTestId(`${imageProps.name}$Image`));
            expect(imageProps.onClick?.execute).toHaveBeenCalledTimes(1);
        });

        it("renders the structure as a background image", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with a different resizeMode", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage resizeMode={"cover"}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with 50% opacity", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage opacity={50}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });
    });

    describe("Dynamic Image SVG", () => {
        beforeEach(() => {
            imageProps.imageObject = dynamicValue({ name: "dynamicSVG.svg", uri: "this/is/a/fake/path.svg" });
        });

        it("renders the structure", async () => {
            const ImageComponent = <Image {...imageProps} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$SvgUriTemporary`), "layout", onLayoutEventData);
            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom height", async () => {
            const ImageComponent = <Image {...imageProps} heightUnit={"points"} customHeight={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$SvgUriTemporary`), "layout", onLayoutEventData);
            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure with custom width", async () => {
            const ImageComponent = <Image {...imageProps} widthUnit={"points"} customWidth={100} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$SvgUriTemporary`), "layout", onLayoutEventData);
            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure inside a modal", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"enlarge"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$SvgUriTemporary`), "layout", onLayoutEventData);
            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            fireEvent(image.getByTestId(`${imageProps.name}$ImageEnlargedPressable`), "layout", onLayoutEventData);

            expect(image.toJSON()).toMatchSnapshot();
        });

        it("triggers the onclick action", async () => {
            const ImageComponent = <Image {...imageProps} onClickType={"action"} />;
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$SvgUriTemporary`), "layout", onLayoutEventData);
            fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
            fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
            expect(imageProps.onClick?.execute).toHaveBeenCalledTimes(1);
        });

        it("renders the structure as a background image", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with a different resizeMode", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage resizeMode={"cover"}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });

        it("renders the structure as a background image with 50% opacity", async () => {
            const ImageComponent = (
                <Image {...imageProps} isBackgroundImage opacity={50}>
                    <Text>Background Image</Text>
                </Image>
            );
            const image = await waitFor(() => render(ImageComponent));

            fireEvent(image.getByTestId(`${imageProps.name}$ImageBackgroundView`), "layout", onLayoutEventData);
            expect(image.toJSON()).toMatchSnapshot();
        });
    });

    describe("Icon", () => {
        describe("type: icon/glyph", () => {
            beforeEach(() => {
                imageProps.datasource = "icon";
                imageProps.imageIcon = dynamicValue<NativeIcon>({ type: "glyph", iconClass: "glyphicon-plus" });
            });

            it("renders the structure with an icon and default color", async () => {
                const image = await waitFor(() => render(<Image {...imageProps} />));
                expect(image.toJSON()).toMatchSnapshot();
            });

            it("uses color if set", async () => {
                const color = "red";
                const image = await waitFor(() => render(<Image {...imageProps} style={[{ image: { color } }]} />));

                expect(image.getByTestId(`${imageProps.name}$Icon`).findByType(GlyphIcon).props.color).toEqual(color);
            });

            it("prefers size from styles", async () => {
                const size = 12;
                const image = await waitFor(() => render(<Image {...imageProps} style={[{ image: { size } }]} />));

                expect(image.getByTestId(`${imageProps.name}$Icon`).findByType(GlyphIcon).props.size).toEqual(size);
            });

            it("prefers size from iconSize prop", async () => {
                const iconSize = 18;
                const image = await waitFor(() => render(<Image {...imageProps} iconSize={iconSize} />));

                expect(image.getByTestId(`${imageProps.name}$Icon`).findByType(GlyphIcon).props.size).toEqual(iconSize);
            });

            it("triggers the onclick action", async () => {
                const image = await waitFor(() => render(<Image {...imageProps} />));

                fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
                expect(imageProps.onClick?.execute).toHaveBeenCalledTimes(1);
            });
        });

        describe("type: image/staticImage", () => {
            beforeEach(() => {
                imageProps.datasource = "image";
                imageProps.imageIcon = dynamicValue<NativeIcon>({
                    type: "image",
                    iconUrl: { uri: require("./image.png") }
                });
            });

            it("renders the structure", async () => {
                const image = await waitFor(() => render(<Image {...imageProps} />));
                fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
                expect(image.toJSON()).toMatchSnapshot();
            });

            it("sets the correct styles", async () => {
                const style = [
                    {
                        image: {
                            color: "black",
                            size: 14,
                            fill: "blue",
                            fillOpacity: 1,
                            fillRule: "unused",
                            stroke: "black",
                            strokeWidth: 2,
                            strokeOpacity: 1,
                            strokeDasharray: "unused",
                            strokeDashoffset: "unused",
                            strokeLinecap: "unused",
                            strokeLinejoin: "unused",
                            strokeMiterlimit: "unused",
                            clipRule: "unused",
                            clipPath: "unused",
                            vectorEffect: "unused",
                            left: 1
                        }
                    }
                ] as Style[];
                const image = await waitFor(() => render(<Image {...imageProps} style={style} />));
                fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
                expect(image.toJSON()).toMatchSnapshot();
            });

            it("renders the structure inside a modal", async () => {
                const image = await waitFor(() => render(<Image {...imageProps} onClickType={"enlarge"} />));

                fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
                fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
                fireEvent(image.getByTestId(`${imageProps.name}$ImageEnlargedPressable`), "layout", onLayoutEventData);
                expect(image.toJSON()).toMatchSnapshot();
            });

            it("triggers the onclick action", async () => {
                const image = await waitFor(() => render(<Image {...imageProps} />));

                fireEvent(image.getByTestId(`${imageProps.name}$ImageSmallPressable`), "layout", onLayoutEventData);
                fireEvent.press(image.getByTestId(`${imageProps.name}$ImageSmallPressable`));
                expect(imageProps.onClick?.execute).toHaveBeenCalledTimes(1);
            });
        });
    });
});
