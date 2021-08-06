import { Properties } from "../../typings/PageEditor";
import { moveProperty } from "../PageEditorUtils";

describe("The PageEditorUtils", () => {
    describe("the moveProperty function", () => {
        let properties: Properties;
        const originalProperties = [
            { caption: "General" },
            { caption: "Data source" },
            { caption: "Events" },
            { caption: "Accessibility" },
            { caption: "Common" },
            { caption: "Dimensions" }
        ];
        beforeEach(() => {
            properties = [...originalProperties];
        });

        it("moves a property forward in the array", () => {
            moveProperty(1, 5, properties);
            expect(properties).toEqual([
                { caption: "General" },
                { caption: "Events" },
                { caption: "Accessibility" },
                { caption: "Common" },
                { caption: "Dimensions" },
                { caption: "Data source" }
            ]);
        });

        it("moves a property backwars in the array", () => {
            moveProperty(5, 2, properties);
            expect(properties).toEqual([
                { caption: "General" },
                { caption: "Data source" },
                { caption: "Dimensions" },
                { caption: "Events" },
                { caption: "Accessibility" },
                { caption: "Common" }
            ]);
        });

        it("does nothing if both indices are the same", () => {
            moveProperty(3, 3, properties);
            expect(properties).toEqual(originalProperties);
        });

        it("does nothing if either index is out of bounds", () => {
            const lowerOutOfBoundIndex = -3;
            const upperOutOfBoundIndex = originalProperties.length + 30;

            moveProperty(lowerOutOfBoundIndex, 3, properties);
            expect(properties).toEqual(originalProperties);

            moveProperty(upperOutOfBoundIndex, 3, properties);
            expect(properties).toEqual(originalProperties);

            moveProperty(2, lowerOutOfBoundIndex, properties);
            expect(properties).toEqual(originalProperties);

            moveProperty(2, upperOutOfBoundIndex, properties);
            expect(properties).toEqual(originalProperties);
        });
    });
});
