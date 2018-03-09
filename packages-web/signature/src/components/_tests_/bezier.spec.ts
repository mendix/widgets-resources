import { Bezier } from "../bezier";
import { Point } from "../point";

describe("Bezier", () => {
    const startPoint = new Point(194, 89, 1520579234208);
    const control1 = new Point(194.25, 88.75, 1520579234208);
    const control2 = new Point(193.539428528519, 88.18904052933922, 1520579234208);
    const endPoint = new Point(194, 88, 1520579234208);
    const bezier = new Bezier(startPoint, control1, control2, endPoint);

    it("returns length", () => {
        expect(bezier.length()).toEqual(1.121625037348145);
    });
});
