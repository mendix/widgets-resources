import React, { createElement, ReactElement, useMemo, useState } from "react";
import classNames from "classnames";
import { LabelSelectorContainerProps } from "../typings/LabelSelectorProps";

import "./ui/LabelSelector.scss";

function escapeForRegExp(string: string): string {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

function matchPartial(string: string): RegExp {
    return new RegExp(`(?:^|\\s)${escapeForRegExp(string)}`, "i");
}

export function LabelSelector(props: LabelSelectorContainerProps): ReactElement | null {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const [userTriggeredItems, setUserTriggeredItems] = useState(false);

    const activeItem = props.labelAssoc?.value;
    const items = props.ds.items ?? [];

    const itemValues = items.map(item => ({
        objectItem: item,
        caption: props.tagAttrib.get(item).value
    }));

    const queryRegex = useMemo(() => matchPartial(query), [query]);

    const filteredItemValues =
        query.length > 0
            ? itemValues.filter(
                  itemValue =>
                      itemValue.caption !== undefined &&
                      itemValue.caption !== null &&
                      queryRegex.test(itemValue.caption)
              )
            : itemValues;

    const hasMatchingItems = filteredItemValues.length > 0;
    const shouldShowItems = query !== "" || userTriggeredItems;

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
                            value={query}
                            // @ts-expect-error Value exists
                            onInput={e => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                // setIsFocused(false);
                                // setUserTriggeredItems(false);
                            }}
                            onKeyDown={e => {
                                if ((e.key === "Down" || e.key === "ArrowDown") && !userTriggeredItems) {
                                    setUserTriggeredItems(true);
                                }
                            }}
                        />
                    </li>
                    {isFocused && shouldShowItems && hasMatchingItems ? (
                        <div>
                            <ul role="listbox">
                                {filteredItemValues.map(({ objectItem, caption }) => (
                                    <li
                                        key={objectItem.id}
                                        role="option"
                                        onClick={e => {
                                            e.preventDefault();
                                            props.labelAssoc.setValue(objectItem);
                                            setUserTriggeredItems(false);
                                        }}
                                    >
                                        {caption}
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
