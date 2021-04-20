import { mount, shallow } from "enzyme";
import { createElement } from "react";
import { BarcodeScanner } from "../BarcodeScanner";

describe("Barcode scanner", () => {
    const backupMediaDevices = window.navigator.mediaDevices;
    afterEach(() => {
        // reset the mocking
        Object.defineProperty(window.navigator, "mediaDevices", {
            value: backupMediaDevices,
            writable: true
        });
    });
    function mockGetUserMedia(getUserMediaMock: jest.Mock): void {
        Object.defineProperty(window.navigator, "mediaDevices", {
            value: {
                getUserMedia: getUserMediaMock
            },
            writable: true
        });
    }

    it("shows an appropriate error when the mediaDevices API is not present (like over http)", () => {
        expect(navigator.mediaDevices).toBe(undefined);
        const barcodeScanner = mount(<BarcodeScanner showMask />);
        expect(barcodeScanner.text()).toBe("This browser is not compatible with the barcode scanner widget");
    });

    it("shows a loading screen while waiting for the user to give persmission to access the media device", () => {
        mockGetUserMedia(jest.fn());
        expect(shallow(<BarcodeScanner showMask />)).toMatchSnapshot();
    });

    it("does not show the overlay when the user opts out of it", () => {
        mockGetUserMedia(jest.fn());
        expect(shallow(<BarcodeScanner showMask={false} />)).toMatchSnapshot();
    });

    it("shows the appropriate error for the user", () => {
        mockGetUserMedia(
            jest.fn(() => {
                throw new Error("This is the error message");
            })
        );

        const barcodeScanner = mount(<BarcodeScanner showMask />);
        expect(barcodeScanner.text()).toBe("This is the error message");
    });
});
