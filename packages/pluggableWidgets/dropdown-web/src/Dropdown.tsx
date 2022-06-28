import { ValueStatus, ObjectItem, ListExpressionValue } from "mendix";
import { createElement, ReactElement, ReactNode, Fragment } from "react";
import { DropdownContainerProps } from "typings/DropdownProps";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import Select from "react-select";
// import { AutoComplete } from "@react-md/autocomplete";
// import { Dropdown as DropdownComponent } from "./components/Dropdown";

// type RequiredKeys<Keys extends keyof Type, Type> = Type & {
//     [P in Keys]-?: Type[P];
// };

// type u = Mxk<"optionLabel", DropdownContainerProps>;
// type m = Pick<DropdownContainerProps, "name">;
// type MC = Required<DropdownContainerProps>;

// function test(arg: u): void {
//     arg.optionLabel
// }

const asOptino = (str: string) => ({ label: str, value: str });
const asItemOption = (format: (o: ObjectItem) => string) => (item: ObjectItem) => ({
    value: item,
    label: format(item)
});
const labelFormatter = (exp: ListExpressionValue<string>) => (item: ObjectItem) => exp.get(item).value ?? item.id;

function SelectEnum(props: DropdownContainerProps): ReactElement {
    const { attrValue } = props;
    const universe = attrValue?.universe ?? [];
    const options = universe.map(asOptino);
    const value = attrValue?.value == null ? undefined : asOptino(attrValue.value);

    return <Select options={options} value={value} onChange={next => attrValue?.setValue(next?.value)} />;
}

function SelectOne(props: DropdownContainerProps): ReactElement {
    const { associationOptions, associationValue, optionLabel } = props;
    if (
        !optionLabel ||
        !associationOptions ||
        !associationOptions.items ||
        !associationValue ||
        associationValue.status !== ValueStatus.Available ||
        associationValue.type === "ReferenceSet"
    ) {
        return <Fragment />;
    }

    const options = associationOptions.items.map((item, index) => optionLabel.get(item).value ?? index.toString());
    const data = options.map(asOptino);
    return (
        <div>
            <div>react-dropdown</div>
            <div>
                <ReactDropdown placeholder="Item is..." options={data} />
            </div>
            <div>react-select</div>
            <div>
                <Select options={data} />
            </div>
        </div>
    );
}

function SelectMany(props: DropdownContainerProps): ReactElement {
    const { associationOptions, associationValue, optionLabel } = props;
    if (
        !optionLabel ||
        !associationOptions ||
        !associationOptions.items ||
        !associationValue ||
        associationValue.status !== ValueStatus.Available ||
        associationValue.type === "Reference"
    ) {
        return <Fragment />;
    }

    const asOption = asItemOption(labelFormatter(optionLabel));
    const options = associationOptions.items.map(asOption);
    const selectedObjects = associationValue.value ?? [];
    const selectedValues = selectedObjects.map(asOption);

    return (
        <Select
            isMulti
            options={options}
            value={selectedValues}
            onChange={next => {
                const items = next.map(option => option.value);
                associationValue.setValue(items);
            }}
        />
    );
}

function getComponent(props: DropdownContainerProps): (props: DropdownContainerProps) => ReactElement {
    if (props.attrValue) {
        return SelectEnum;
    }

    if (props.multiselect) {
        return SelectMany;
    }

    return SelectOne;
}

export function Dropdown(props: DropdownContainerProps): ReactNode {
    const Component = getComponent(props);
    return <Component {...props} />;
}
