import { createElement, ReactElement, useCallback } from "react";
import { ValueStatus } from "mendix";
import { executeAction } from "@mendix/piw-utils-internal";
import { RadioButtonsContainerProps } from "../typings/RadioButtonsProps";
import { RadioGroup, Radio, RadioProps } from "./components/RadioButtons";
import { useRadioButtonsGroups } from "./utils/data";

export function RadioButtons({
    class: className,
    content,
    ds,
    dsAttribute,
    enableAutoOptions,
    labelAttrib,
    name,
    onChange,
    options,
    orientation,
    style
}: RadioButtonsContainerProps): ReactElement | null {
    const isEditable = !dsAttribute?.readOnly;
    const radioGroups = useRadioButtonsGroups({
        content,
        ds,
        dsAttribute,
        enableAutoOptions,
        labelAttrib,
        options
    });

    const onRadioGroupValueChange = useCallback<RadioProps["onChange"]>(
        index => {
            const selectedValue = radioGroups[index].value;
            if (dsAttribute && dsAttribute.status === ValueStatus.Available && dsAttribute.value !== selectedValue) {
                dsAttribute.setValue(selectedValue);
                executeAction(onChange);
            }
        },
        [ds.items, ds.status, dsAttribute, onChange, radioGroups]
    );
    console.log(dsAttribute);

    return (
        <RadioGroup
            className={className}
            currentIndex={radioGroups.findIndex(group => group.value === dsAttribute?.value)}
            name={name}
            orientation={orientation}
            numberOfItems={radioGroups.length}
            style={style}
        >
            {radioGroups.map((group, index) => (
                <Radio
                    disabled={!isEditable}
                    index={index}
                    key={group.value.toString()}
                    label={group.label}
                    onChange={onRadioGroupValueChange}
                >
                    {group.content}
                </Radio>
            ))}
        </RadioGroup>
    );
}
