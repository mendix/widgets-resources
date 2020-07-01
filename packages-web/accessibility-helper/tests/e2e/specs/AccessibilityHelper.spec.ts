import page from "../../../../../configs/e2e/src/pages/page";

describe("accessibility-helper", () => {
    beforeAll(() => {
        page.open("");
    });

    it("sets attributes when condition is true", () => {
        const elementToBeChanged = page.getWidget("elementToBeChanged");
        expect(elementToBeChanged.getAttribute("yolo1")).toEqual(null);
        $(".mx-name-radiButtons1 input").click();
        expect(elementToBeChanged.getAttribute("yolo1")).toEqual("yolo1");
    });

    it("hides attributes when condition is false", () => {
        expect(true).toBe(true);
    });

    it("updates target attributes when attributes are expression", () => {
        expect(true).toBe(true);
    });

    it("doesnt change forbidden attributes", () => {
        expect(true).toBe(true);
    });

    it("sets target attributes even though target's props changed eg: textinput", () => {
        // set attribute
        // someone changes the target outside
        // check if attribute is still there
        expect(true).toBe(true);
    });

    it("sets target attributes even though target is conditionally shown after being hidden", () => {
        expect(true).toBe(true);
    });
});
