/**
 * @jest-environment jsdom
 */
import { Maps, Props } from "../Maps";
import { mount } from "enzyme";
import { dynamicValue } from "@mendix/piw-utils-internal";

describe("", () => {
    let defaultProps: Props;

    beforeEach(() => {
        defaultProps = {
            name: "maps-test",
            style: [],
            markers: [],
            dynamicMarkers: [],
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

    it("renders", async () => {
        defaultProps.markers = [
            {
                locationType: "latlng", // Tokyo
                latitude: dynamicValue(new Big(35.6895), false),
                longitude: dynamicValue(new Big(139.6917), false),
                iconSize: 1,
                iconColor: "red"
            },
            {
                locationType: "latlng", // Amsterdam
                latitude: dynamicValue(new Big(52.3702), false),
                longitude: dynamicValue(new Big(4.8952), false),
                iconSize: 1,
                iconColor: "red"
            }
        ];
        const wrapper = mount(<Maps {...defaultProps} />);
        // wrapper.setState({ status: "mapReady" });
        await new Promise(resolve => {
            setTimeout(resolve, 5000);
        });

        wrapper.update();
        console.log(wrapper.state.status);
        // wrapper.find("MarkerView")
        expect(wrapper).toMatchSnapshot();
    });
});
