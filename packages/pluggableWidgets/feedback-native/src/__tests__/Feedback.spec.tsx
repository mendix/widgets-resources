import { FeedbackStyle } from "../ui/styles";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { createElement } from "react";
import { FeedbackProps } from "../../typings/FeedbackProps";
import { Feedback } from "../Feedback";
import { dynamicValue } from "@mendix/piw-utils-internal";
import { NativeImage } from "mendix";
// import { sendToSprintr } from "../utils/sprintrApi";

// jest.mock("../utils/sprintrApi");
global.fetch = jest.fn();

describe("Feedback", () => {
    let defaultProps: FeedbackProps<FeedbackStyle>;

    beforeEach(() => {
        defaultProps = {
            name: "feedback-test",
            style: [],
            sprintrapp: "sprintr-app-id",
            allowScreenshot: true,
            logo: dynamicValue<NativeImage>({ uri: "path/to/image" })
        };
    });

    it("renders", () => {
        const component = render(<Feedback {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("should not show screenshot option if 'allowScreenshots' is false", () => {
        defaultProps.allowScreenshot = false;
        const component = render(<Feedback {...defaultProps} />);
        expect(component.queryByText("Include Screenshot")).toBeNull();
        expect(component.queryByTestId("feedback-test$switch")).toBeNull();
    });

    it("should call the api when sending", async () => {
        const feedbackMsg = "unittest";
        const component = render(<Feedback {...defaultProps} />);
        fireEvent.press(component.getByTestId("feedback-test$button"));
        await waitFor(() => {
            fireEvent.changeText(component.getByTestId("feedback-test$input"), feedbackMsg);
            fireEvent.press(component.getByTestId("feedback-test$send"));
            expect(fetch).toHaveBeenCalledWith(
                "https://feedback-api.mendix.com/rest/v3/feedbackapi/projects/sprintr-app-id/issues",
                {
                    body: '{"title":"unittest","description":"","issueType":"Issue","submitter":{"userId":"","email":"unknown@example.com","displayName":"Unknown Native User"},"metadata":{"userRoles":"","location":"","form":"","userAgent":"Native for ios","screenWidth":750,"screenHeight":1334},"imageAttachment":""}',
                    headers: { ClientIdentifier: "feedback-native-v2", "Content-Type": "application/json" },
                    method: "POST",
                    mode: "no-cors",
                    referrer: "no-referrer"
                }
            );
        });
    });
});
