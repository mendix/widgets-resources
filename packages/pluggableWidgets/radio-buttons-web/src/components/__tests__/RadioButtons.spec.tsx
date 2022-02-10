// import { ObjectItem } from "mendix";
import { actionValue, dynamicValue, EditableValueBuilder, ListValueBuilder } from "@mendix/piw-utils-internal";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createElement } from "react";
import { RadioButtons } from "../../RadioButtons";
import { RadioButtonsContainerProps } from "../../../typings/RadioButtonsProps";

function renderWithThreeItems(props?: Partial<RadioButtonsContainerProps>): RenderResult {
    return render(
        <RadioButtons
            name="radio-buttons-test"
            class=""
            dataSourceType="attribute"
            ds={ListValueBuilder().withItems([])}
            dsAttribute={new EditableValueBuilder<string | boolean>()
                .withValue("second-option")
                .withUniverse("first-option", "second-option", "third-option")
                .build()}
            orientation="vertical"
            enableAutoOptions
            options={[]}
            isEditable
            {...props}
        />
    );
}

describe("The RadioButtons widget", () => {
    describe("renders correctly", () => {
        it("with default configuration", () => {
            const { asFragment } = renderWithThreeItems();
            expect(asFragment()).toMatchSnapshot();
        });

        it("with horizontal orientation", () => {
            const { asFragment } = renderWithThreeItems({ orientation: "horizontal" });
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it("handles choosing a new value", () => {
        const dsAttribute = new EditableValueBuilder<string | boolean>()
            .withValue("first-option")
            .withUniverse("first-option", "second-option", "third-option")
            .build();
        const attributeSetValueSpy = jest.spyOn(dsAttribute, "setValue");
        const onChangeMock = actionValue();

        renderWithThreeItems({ dsAttribute, onChange: onChangeMock });

        const radioButtons = screen.getAllByRole("radio");
        expect(radioButtons).toHaveLength(3);

        fireEvent.click(radioButtons[2]);
        expect(attributeSetValueSpy).toHaveBeenCalledWith("third-option");
        expect(onChangeMock.execute).toHaveBeenCalledTimes(1);
    });

    it("handles an association datasource", () => {
        // TODO: Have to wait until typings
    });

    it("allows for custom options when specifying the attribute datasource and enableAutoOptions to false", () => {
        const options = [
            { caption: dynamicValue("custom option 1"), value: dynamicValue("option 1") },
            { caption: dynamicValue("custom option 2"), value: dynamicValue("option 2") },
            { caption: dynamicValue("custom option 3"), value: dynamicValue("option 3") },
            { caption: dynamicValue("custom option 4"), value: dynamicValue("option 4") }
        ];

        render(
            <RadioButtons
                name="radio-buttons-test"
                class=""
                dataSourceType="attribute"
                ds={ListValueBuilder().withItems([])}
                dsAttribute={undefined}
                orientation="vertical"
                enableAutoOptions={false}
                options={options}
                isEditable
            />
        );

        options.forEach(option => {
            expect(screen.getByLabelText(option.caption.value!)).toBeInTheDocument();
        });
    });

    describe("accessibility wise", () => {
        function tabIntoRadioGroup(): void {
            expect(document.body).toHaveFocus();
            userEvent.tab();
        }

        it("the user can only tab into the radio group through the current value", () => {
            renderWithThreeItems();

            const radioButtons = screen.getAllByRole("radio");
            expect(radioButtons).toHaveLength(3);
            tabIntoRadioGroup();

            expect(radioButtons[0]).not.toHaveFocus();
            expect(radioButtons[1]).toHaveFocus();
            expect(radioButtons[2]).not.toHaveFocus();
        });

        it("the user can loop through the bottom of the radio group using keyboard interactions", () => {
            const dsAttribute = new EditableValueBuilder<string | boolean>()
                .withValue("third-option")
                .withUniverse("first-option", "second-option", "third-option")
                .build();
            const attributeSetValueSpy = jest.spyOn(dsAttribute, "setValue");

            renderWithThreeItems({ dsAttribute });

            const radioButtons = screen.getAllByRole("radio");
            expect(radioButtons).toHaveLength(3);
            tabIntoRadioGroup();
            expect(radioButtons[2]).toHaveFocus();

            userEvent.keyboard("{ArrowDown}");
            expect(radioButtons[0]).toHaveFocus();
            expect(attributeSetValueSpy).toHaveBeenCalledWith("first-option");
        });

        it("the user can loop through the top of the radio group using keyboard interactions", () => {
            const dsAttribute = new EditableValueBuilder<string | boolean>()
                .withValue("first-option")
                .withUniverse("first-option", "second-option", "third-option")
                .build();
            const attributeSetValueSpy = jest.spyOn(dsAttribute, "setValue");

            renderWithThreeItems({ dsAttribute });

            const radioButtons = screen.getAllByRole("radio");
            expect(radioButtons).toHaveLength(3);
            tabIntoRadioGroup();
            expect(radioButtons[0]).toHaveFocus();

            userEvent.keyboard("{ArrowLeft}");
            expect(radioButtons[2]).toHaveFocus();
            expect(attributeSetValueSpy).toHaveBeenCalledWith("third-option");
        });
    });
});
