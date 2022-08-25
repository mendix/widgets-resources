import { render, ShallowWrapper, shallow, mount } from "enzyme";
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

    it("renders as radioGroup when have option0 disabled", () => {
        defaultRadioProps.direction = "vertical";
        defaultRadioProps.options[0].disabled = true;
        const radioWrapper = render(<RadioComponent {...defaultRadioProps} />);
        expect(radioWrapper).toMatchSnapshot();
    });

    it("triggers onChange function with radiot change", () => {
        const onChange = jest.fn();
        defaultRadioProps.options = [{ label: "Apple", value: "Apple" }];
        const radioWrapper = mount(<RadioComponent {...defaultRadioProps} onChange={onChange} />);
        const inputWrapper = radioWrapper.find("input");
        inputWrapper.simulate("change");
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
