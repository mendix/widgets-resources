import { shallow } from "enzyme";
import { createElement, Fragment, ReactNode } from "react";

import { Fieldset, FieldsetProps } from "../components/Fieldset";

describe("Fieldset", () => {
    const defaultFieldsetProps: FieldsetProps = {
        name: "fieldset",
        className: "className",
        style: {},
        tabIndex: 0,
        legend: "legend"
    };

    const defaultChildren: ReactNode = (
        <Fragment>
            <label>Name:</label>
            <input type="text" name="employee_name" id="employee_name" />
        </Fragment>
    );

    it("renders children and legend", () => {
        const fieldset = shallow(<Fieldset {...defaultFieldsetProps}>{defaultChildren}</Fieldset>);

        expect(fieldset).toMatchSnapshot();
    });
    it("renders only children when no legend is passed", () => {
        const fieldset = shallow(
            <Fieldset {...defaultFieldsetProps} legend={undefined}>
                {defaultChildren}
            </Fieldset>
        );

        expect(fieldset).toMatchSnapshot();
    });
});
