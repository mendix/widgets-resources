import { mount, shallow } from "enzyme";
import { createElement } from "react";
import * as zxing from "@zxing/library";
import { Dimensions } from "@mendix/piw-utils-internal";
import { BarcodeScanner, BarcodeScannerOverlay } from "../BarcodeScanner";
import * as mediaStreamFunctions from "../../hooks/useMediaStream";
import { act } from "react-dom/test-utils";

jest.mock("@zxing/library", () => {
    const original = jest.requireActual("@zxing/library");
    return {
        ...original,
        BrowserMultiFormatReader: jest.fn()
    };
});

describe("Barcode scanner", () => {
    const backupMediaDevices = window.navigator.mediaDevices;
    const dimensions: Dimensions = {
        widthUnit: "percentage",
        width: 100,
        heightUnit: "percentageOfParent",
        height: 100
    };

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
        const barcodeScanner = mount(<BarcodeScanner class="" showMask {...dimensions} />);
        expect(barcodeScanner.text()).toBe(
            "The barcode scanner widget is only compatible with certain browsers and requires a secure HTTPS connection in certain browsers. If you encounter this error message as an user, please contact your system administrator. If you are a Mendix developer, please refer to the appropriate docs on how to resolve this issue."
        );
    });

    it("shows a loading screen while waiting for the user to give persmission to access the media device", () => {
        mockGetUserMedia(jest.fn());
        expect(shallow(<BarcodeScanner class="" showMask {...dimensions} />)).toMatchSnapshot();
    });

    it("does not show the overlay when the user opts out of it", () => {
        mockGetUserMedia(jest.fn());
        expect(shallow(<BarcodeScanner class="" showMask={false} {...dimensions} />)).toMatchSnapshot();
    });

    it("calls the onDetect function if it has been provided and a barcode has been detected", async () => {
        const onDetectMock = jest.fn();
        const handleFakeMediaStream = Promise.resolve({});
        const handleScanResult = Promise.resolve({ getText: jest.fn(() => "https://www.mendix.com") });
        jest.spyOn(mediaStreamFunctions, "browserSupportsCameraAccess").mockImplementation(() => true);
        mockGetUserMedia(jest.fn(() => handleFakeMediaStream));

        // @ts-expect-error It has been mocked
        zxing.BrowserMultiFormatReader.mockImplementation(() => ({
            decodeOnceFromStream: jest.fn(() => handleScanResult)
        }));

        mount(<BarcodeScanner class="" showMask onDetect={onDetectMock} {...dimensions} />);

        await act(async () => {
            await handleFakeMediaStream;
        });

        expect(onDetectMock).toHaveBeenCalledWith("https://www.mendix.com");
    });

    describe("shows an appropriate error to the user", () => {
        it("in the form of text when a generic error occurs", () => {
            mockGetUserMedia(
                jest.fn(() => {
                    throw new Error("This is an error message");
                })
            );

            const barcodeScanner = mount(<BarcodeScanner class="" showMask {...dimensions} />);
            expect(barcodeScanner.text()).toBe(
                "Error in barcode scanner: an unexpected error occurred while retrieving the camera media stream."
            );
        });

        it("in the form of text when no device was found", () => {
            mockGetUserMedia(
                jest.fn(() => {
                    const error = new Error("This is an error message");
                    error.name = "NotFoundError";
                    throw error;
                })
            );

            const barcodeScanner = mount(<BarcodeScanner class="" showMask {...dimensions} />);
            expect(barcodeScanner.text()).toBe("Error in barcode scanner: no camera media devices were found.");
        });

        it("not in the form of text since that is handled by the design when the users denies access to the camera", () => {
            mockGetUserMedia(
                jest.fn(() => {
                    const error = new Error("This is an error message");
                    error.name = "NotAllowedError";
                    throw error;
                })
            );

            const barcodeScanner = mount(<BarcodeScanner class="" showMask {...dimensions} />);
            expect(barcodeScanner.text()).not.toContain("Error in barcode scanner");
        });

        it("in the form of text when the code scanner unexpectedly fails", async () => {
            const handleFakeMediaStream = Promise.resolve({});
            jest.spyOn(mediaStreamFunctions, "browserSupportsCameraAccess").mockImplementation(() => true);
            mockGetUserMedia(jest.fn(() => handleFakeMediaStream));

            // @ts-expect-error It has been mocked
            zxing.BrowserMultiFormatReader.mockImplementation(() => {
                throw new Error("This is an error");
            });

            const barcodeScanner = mount(<BarcodeScanner class="" showMask {...dimensions} />);

            await act(async () => {
                await handleFakeMediaStream;
            });
            // The above `act` block handles state updates as a result of the `handleFakeMediaStream` promise, but not
            // actual DOM updates, which is why we need this `.update` call.
            barcodeScanner.update();

            expect(barcodeScanner.text()).toBe(
                "Error in barcode scanner: an unexpected error occurred while detecting a barcode in the camera media stream."
            );
        });
    });

    it("the overlay structure should be correct", () => {
        expect(shallow(<BarcodeScannerOverlay class="" showMask {...dimensions} />)).toMatchSnapshot();
    });
});
