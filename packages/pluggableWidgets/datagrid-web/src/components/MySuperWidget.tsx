import { createElement, ReactElement, useEffect, useState } from "react";
import { useFilterDispatcher } from "./provider";
import Big from "big.js";

export function MySuperWidget(): ReactElement {
    const filterDispatcher = useFilterDispatcher();
    const [value, setValue] = useState(2);
    useEffect(() => {
        filterDispatcher({ filter: (item, attr) => !value || (attr(item).value as Big).gte(new Big(value)) });
    }, [filterDispatcher, value]);
    return <input value={value.toString()} onChange={v => setValue(parseInt(v.target.value, 10))} type="number" />;
}
