import { Maps, Props } from "../Maps";
import { render } from "react-native-testing-library";
import { createElement } from "react";

describe("", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "maps-test",
            style: [],
            markers: [],
            fitToMarkers: true,
            defaultZoomLevel: "city",
            minZoomLevel: "city",
            maxZoomLevel: "streets",
            mapType: "standard",
            provider: "default",
            interactive: true,
            showsUserLocation: false
        };
    });

    it("renders", () => {
        const component = render(<Maps {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot("");
    });
});
