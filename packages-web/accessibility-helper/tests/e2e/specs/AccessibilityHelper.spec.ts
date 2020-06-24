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
});
