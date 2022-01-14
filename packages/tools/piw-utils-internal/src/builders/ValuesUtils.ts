import { ReactNode } from "react";
import { Big } from "big.js";
import { ListExpressionValue, ListWidgetValue } from "mendix";
import { dynamicValue } from "./DynamicActionValueBuilder";

export function buildListExpression<T extends string | boolean | Date | Big>(value: T): ListExpressionValue<T> {
    return { get: () => dynamicValue<T>(value) } as Pick<ListExpressionValue, "get"> as ListExpressionValue<T>;
}

export function buildWidgetValue(value: ReactNode): ListWidgetValue {
    return { get: () => value } as Pick<ListWidgetValue, "get"> as ListWidgetValue;
}
