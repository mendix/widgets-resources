import { createElement } from "react";
import SignatureScreen from "react-native-signature-canvas";
import { fireEvent, render } from "react-native-testing-library";

import { Signature, Props } from "../Signature";
import { actionValue, dynamicValue, EditableValueBuilder } from "@widgets-resources/piw-utils";

jest.mock("react-native/Libraries/Utilities/Platform", () => {
    const Platform = jest.requireActual("react-native/Libraries/Utilities/Platform");
    Platform.OS = "ios";
    return Platform;
});

const defaultProps: Props = {
    name: "signature-test",
    style: [],
    imageAttribute: new EditableValueBuilder<string>().withValue("").build(),
    buttonCaptionClear: dynamicValue<string>("Clear"),
    buttonCaptionSave: dynamicValue<string>("Save")
};

describe("Signature iOS", () => {
    it("renders with default styles", () => {
        const component = render(<Signature {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styles", () => {
        const style = [
            {
                container: { penColor: "black", backgroundColor: "red", borderColor: "orange" },
                buttonWrapper: { backgroundColor: "green" },
                buttonClearContainer: { backgroundColor: "green" },
                buttonSaveContainer: { backgroundColor: "green" },
                buttonClearCaption: { color: "white" },
                buttonSaveCaption: { color: "white" }
            },
            {
                container: { backgroundColor: "green" },
                buttonWrapper: { backgroundColor: "red" },
                buttonClearContainer: { backgroundColor: "red" },
                buttonSaveContainer: { backgroundColor: "red" },
                buttonClearCaption: { color: "black" },
                buttonSaveCaption: { color: "black" }
            }
        ];
        const component = render(<Signature {...defaultProps} style={style} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    describe("executes action", () => {
        it("on clear", () => {
            const onClearAction = actionValue();
            const component = render(<Signature {...defaultProps} onClear={onClearAction} />);
            const canvas = component.UNSAFE_getByType(SignatureScreen);

            fireEvent(canvas, "onClear");
            expect(onClearAction.execute).toHaveBeenCalledTimes(1);
        });
        it("on save", () => {
            const onSaveAction = actionValue();
            const component = render(<Signature {...defaultProps} onSave={onSaveAction} />);
            const canvas = component.UNSAFE_getByType(SignatureScreen);

            fireEvent(canvas, "onOK");
            expect(onSaveAction.execute).toHaveBeenCalledTimes(1);
        });
        it("on empty", () => {
            const onEmptyAction = actionValue();
            const component = render(<Signature {...defaultProps} onEmpty={onEmptyAction} />);
            const canvas = component.UNSAFE_getByType(SignatureScreen);

            fireEvent(canvas, "onEmpty");
            expect(onEmptyAction.execute).toHaveBeenCalledTimes(1);
        });
        it("on end", () => {
            const onEndAction = actionValue();
            const component = render(<Signature {...defaultProps} onEnd={onEndAction} />);
            const canvas = component.UNSAFE_getByType(SignatureScreen);

            fireEvent(canvas, "onEnd");
            expect(onEndAction.execute).toHaveBeenCalledTimes(1);
        });
    });
});
