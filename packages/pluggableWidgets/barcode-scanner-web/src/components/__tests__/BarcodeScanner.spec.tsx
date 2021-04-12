import { mount } from "enzyme";
import { createElement } from "react";
import { BarcodeScanner } from "../BarcodeScanner";

describe("Barcode scanner", () => {
    it("bla", () => {
        expect(mount(<BarcodeScanner />)).not.toBe(undefined);
    });
});
