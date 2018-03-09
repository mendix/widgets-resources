import { Point } from "../point";

describe("Point", () => {
    const point = new Point(183, 89, 1520579234208);

    it("returns a velocityfrom", () => {
        expect(point.velocityFrom(point)).toEqual(1);
    });

    it("return a distanceTo", () => {
        expect(point.distanceTo(point)).toEqual(0);
    });
});
