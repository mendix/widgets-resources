import { render, ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";

import { RadioComponent, RadioProps } from "../RadioComponent";

describe("Radio", () => {
    const createRadio = (props: RadioProps): ShallowWrapper<any, any> => shallow(<RadioComponent {...props} />);

    let defaultRadioProps: RadioProps;

    beforeEach(() => {
        defaultRadioProps = {
            options: [
                { label: "Apple", value: "Apple" },
                { label: "Pear", value: "Pear" },
                { label: "Orange", value: "Orange" }
            ]
        };
    });

    it("renders as radioGroup", () => {
        const radioWrapper = createRadio(defaultRadioProps);
        expect(radioWrapper).toMatchSnapshot();
    });

    it("renders as radioGroup when direction is vertical", () => {
        defaultRadioProps.direction = "vertical";
        const radioWrapper = createRadio(defaultRadioProps);
        radioWrapper.find(".ant-space-vertical").exists();
    });

    it("renders as radioGroup when have defaultValue", () => {
        defaultRadioProps.defaultValue = "Pear";
        const radioWrapper = render(<RadioComponent {...defaultRadioProps} />);
        expect(radioWrapper).toMatchSnapshot();
    });

    it("renders as radioGroup when optionType is equal to button", () => {
        defaultRadioProps.optionType = "button";
        const radioWrapper = createRadio(defaultRadioProps);
        expect(radioWrapper).toMatchSnapshot();
    });

    it("renders as radioGroup when option is disabled", () => {
        defaultRadioProps.options[0].disabled = true;
        const radioWrapper = render(<RadioComponent {...defaultRadioProps} />);
        expect(radioWrapper).toMatchSnapshot();
    });

    it("renders as radioGroup when have disabled", () => {
        defaultRadioProps.disabled = true;
        defaultRadioProps.options[0].disabled = true;
        const radioWrapper = render(<RadioComponent {...defaultRadioProps} />);
        expect(radioWrapper).toMatchSnapshot();
    });
});
