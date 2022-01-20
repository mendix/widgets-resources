import React, { createElement, ReactElement, useState } from "react";
import classNames from "classnames";
import { LabelSelectorContainerProps } from "../typings/LabelSelectorProps";

import "./ui/LabelSelector.scss";

export function LabelSelector(props: LabelSelectorContainerProps): ReactElement | null {
    const [isFocused, setIsFocused] = useState(false);

    const activeItem = props.labelAssoc?.value;
    const items = props.ds.items ?? [];
    const x = true;
    return (
        <React.Fragment>
            <select onChange={e => props.labelAssoc.setValue(items.find(item => item.id === e.target.value))}>
                {items.map(item => (
                    <option key={item.id} value={item.id} selected={item.id === props.labelAssoc?.value?.id}>
                        {props.tagAttrib.get(item).value}
                    </option>
                ))}
            </select>
            <div className="widget-label-selector">
                <ul className="label-selector-container">
                    {activeItem ? (
                        <li className={classNames("label-item", "label-item-editable")} key={activeItem?.id}>
                            <span>{props.tagAttrib.get(activeItem).value}</span>
                            <button>X</button>
                        </li>
                    ) : null}
                    <li className={classNames("label-item", "label-item-new")}>
                        <input
                            type="text"
                            autoComplete="off"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </li>
                    {isFocused || x ? (
                        <div>
                            <ul role="listbox">
                                {props.ds.items?.map(item => (
                                    <li
                                        key={item.id}
                                        role="option"
                                        onClick={e => {
                                            e.preventDefault();
                                            props.labelAssoc.setValue(item);
                                        }}
                                    >
                                        {props.tagAttrib.get(item).value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </ul>
            </div>
        </React.Fragment>
    );
}
