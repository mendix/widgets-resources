import { createElement, ReactElement, useCallback } from "react";
import { ValueStatus } from "mendix";
import { executeAction } from "@mendix/piw-utils-internal";
import { RadioButtonsContainerProps } from "../typings/RadioButtonsProps";
import { RadioGroup, Radio, RadioProps } from "./components/RadioButtons";
import { useRadioButtonsGroups } from "./utils/data";

export function RadioButtons({
    class: className,
    content,
    dataSourceType,
    ds,
    dsAssociation,
    dsAttribute,
    enableAutoOptions,
    isEditable,
    labelAttrib,
    name,
    onChange,
    options,
    orientation,
    style
}: RadioButtonsContainerProps): ReactElement | null {
    const radioGroups = useRadioButtonsGroups({
        content,
        dataSourceType,
        ds,
        dsAssociation,
        dsAttribute,
        enableAutoOptions,
        labelAttrib,
        options
    });

    const onRadioGroupValueChange = useCallback<RadioProps["onChange"]>(
        index => {
            const selectedValue = radioGroups[index].value;
            switch (dataSourceType) {
                case "attribute": {
                    if (
                        dsAttribute &&
                        dsAttribute.status === ValueStatus.Available &&
                        dsAttribute.value !== selectedValue
                    ) {
                        dsAttribute.setValue(selectedValue);
                        executeAction(onChange);
                    }
                    break;
                }
                case "association": {
                    if (
                        ds.status === ValueStatus.Available &&
                        dsAssociation &&
                        dsAssociation.status === ValueStatus.Available &&
                        dsAssociation.value?.id !== selectedValue
                    ) {
                        const item = ds.items?.find(item => item.id === selectedValue);
                        if (item) {
                            dsAssociation.setValue(item);
                            executeAction(onChange);
                        }
                    }
                    break;
                }
                default:
                    break;
            }
        },
        [dataSourceType, ds.items, ds.status, dsAssociation, dsAttribute, onChange, radioGroups]
    );

    return (
        <RadioGroup
            className={className}
            currentIndex={radioGroups.findIndex(
                group =>
                    group.value === (dataSourceType === "association" ? dsAssociation?.value?.id : dsAttribute?.value)
            )}
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
