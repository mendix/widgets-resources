import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { createElement, Fragment, ReactNode } from "react";

import { Fieldset, FieldsetProps } from "../components/Fieldset";

// export interface FieldsetProps {
//     name?: string;
//     className: string;
//     style?: CSSProperties;
//     tabIndex?: number;
//     legend?: string;
// }

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
            <br />
            <input type="text" name="employee_name" id="employee_name" />
        </Fragment>
    );

    it("renders children and legend", () => {
        const fieldset = shallow(<Fieldset {...defaultFieldsetProps}>{defaultChildren}</Fieldset>);

        expect(shallowToJson(fieldset)).toMatchSnapshot();
    });
    it("renders only children when no legend is passed", () => {
        const fieldset = shallow(
            <Fieldset {...defaultFieldsetProps} legend={undefined}>
                {defaultChildren}
            </Fieldset>
        );

        expect(shallowToJson(fieldset)).toMatchSnapshot();
    });
    it("renders nothing when no children are passed", () => {
        const fieldset = shallow(<Fieldset {...defaultFieldsetProps} />);

        expect(shallowToJson(fieldset)).toMatchSnapshot();
    });
});
