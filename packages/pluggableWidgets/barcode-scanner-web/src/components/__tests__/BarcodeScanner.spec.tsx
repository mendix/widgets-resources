import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { Dimensions } from "@mendix/piw-utils-internal";
import { NotFoundException } from "@zxing/library/cjs";
import { BarcodeScanner } from "../BarcodeScanner";

let useReaderMock = jest.fn();
jest.mock("../../hooks/useReader", () => ({
    // we can't use mock directly because of variable hosting.
    useReader: (...args: any[]) => useReaderMock(...args)
}));

describe("Barcode scanner", () => {
    const backupMediaDevices = window.navigator.mediaDevices;
    const dimensions: Dimensions = {
        widthUnit: "percentage",
        width: 100,
        heightUnit: "percentageOfParent",
        height: 100
    };

    function mockGetUserMedia(getUserMediaMock: jest.Mock): void {
        Object.defineProperty(window.navigator, "mediaDevices", {
            value: { getUserMedia: getUserMediaMock },
            writable: true
        });
    }

    afterEach(() => {
        // reset the mocking
        Object.defineProperty(window.navigator, "mediaDevices", {
            value: backupMediaDevices,
            writable: true
        });
        useReaderMock = jest.fn();
    });

    it("renders video and overlay correctly", () => {
        mockGetUserMedia(jest.fn());
        expect(render(<BarcodeScanner class="" showMask {...dimensions} />).container).toMatchSnapshot();
    });

    it("does not show the overlay when the user opts out of it", () => {
        mockGetUserMedia(jest.fn());
        expect(render(<BarcodeScanner class="" showMask={false} {...dimensions} />).container).toMatchSnapshot();
    });

    it("shows an appropriate error when the mediaDevices API is not present (like over http)", async () => {
        expect(navigator.mediaDevices).toBe(undefined);
        expect(render(<BarcodeScanner class="" showMask {...dimensions} />).container).toMatchSnapshot();
    });

    it("prop health check: pass onDetect prop as onSuccess callback", async () => {
        const onDetectMock = jest.fn();
        useReaderMock.mockImplementationOnce((args: any) => {
            setTimeout(() => args.onSuccess("42"), 100);
        });
        mockGetUserMedia(jest.fn());

        render(<BarcodeScanner class="" onDetect={onDetectMock} showMask {...dimensions} />);

        await waitFor(() => expect(onDetectMock).toBeCalledWith("42"));
    });

    describe("shows an appropriate error to the user", () => {
        it("in the form of text when a generic error occurs", async () => {
            useReaderMock.mockImplementationOnce((args: any) => {
                setTimeout(() => args.onError(new Error("this is unexpected error")), 100);
            });
            mockGetUserMedia(jest.fn());

            const { container } = render(<BarcodeScanner class="" showMask {...dimensions} />);

            await waitFor(() =>
                expect(container).toHaveTextContent(
                    "Error in barcode scanner: an unexpected error occurred while retrieving the camera media stream."
                )
            );
        });

        it("in the form of text when no device was found", async () => {
            useReaderMock.mockImplementationOnce((args: any) => {
                setTimeout(() => {
                    const error = new Error("This is an error message");
                    error.name = "NotFoundError";
                    args.onError(error);
                }, 100);
            });

            mockGetUserMedia(jest.fn());

            const { container } = render(<BarcodeScanner class="" showMask {...dimensions} />);

            await waitFor(() =>
                expect(container).toHaveTextContent("Error in barcode scanner: no camera media devices were found.")
            );
        });

        it("not in the form of text since that is handled by the design when the users denies access to the camera", async () => {
            useReaderMock.mockImplementationOnce((args: any) => {
                setTimeout(() => {
                    const error = new Error("This is an error message");
                    error.name = "NotAllowedError";
                    args.onError(error);
                }, 100);
            });

            mockGetUserMedia(jest.fn());

            const { container } = render(<BarcodeScanner class="" showMask {...dimensions} />);

            await waitFor(() => expect(container).not.toHaveTextContent(/Error in barcode scanner:/));
        });

        it("in the form of text when the code scanner unexpectedly fails", async () => {
            useReaderMock.mockImplementationOnce((args: any) => {
                setTimeout(() => {
                    args.onError(new NotFoundException("Unable to decode from stream"));
                }, 100);
            });

            mockGetUserMedia(jest.fn());

            const { container } = render(<BarcodeScanner class="" showMask {...dimensions} />);

            await waitFor(() =>
                expect(container).toHaveTextContent(
                    "Error in barcode scanner: an unexpected error occurred while detecting a barcode in the camera media stream."
                )
            );
        });
    });
});
