import { ListAttributeValue } from "mendix";
import { Big } from "big.js";

export class ListAttributeValueBuilder<T extends string | boolean | Date | Big> {
    private readonly listAttribute: Partial<ListAttributeValue<T>> = {
        id: "" as any,
        get: jest.fn(),
        sortable: true,
        filterable: true,
        type: "String",
        formatter: {
            format: jest.fn((value: T) => value.toString()),
            parse: jest.fn()
        },
        universe: undefined
    };

    withId(id: any): ListAttributeValueBuilder<T> {
        this.listAttribute.id = id;
        return this;
    }

    withSortable(sortable: boolean): ListAttributeValueBuilder<T> {
        this.listAttribute.sortable = sortable;
        return this;
    }

    withFilterable(filterable: boolean): ListAttributeValueBuilder<T> {
        this.listAttribute.filterable = filterable;
        return this;
    }

    withType(
        type:
            | "AutoNumber"
            | "Binary"
            | "Boolean"
            | "DateTime"
            | "Decimal"
            | "Enum"
            | "EnumSet"
            | "HashString"
            | "Integer"
            | "Long"
            | "ObjectReference"
            | "ObjectReferenceSet"
            | "String"
    ): ListAttributeValueBuilder<T> {
        this.listAttribute.type = type;
        return this;
    }

    withFormatter(format: (value?: any) => string, parse: () => any): ListAttributeValueBuilder<T> {
        this.listAttribute.formatter = {
            format,
            parse
        };
        return this;
    }

    withUniverse(universe: T[]): ListAttributeValueBuilder<T> {
        this.listAttribute.universe = universe;
        return this;
    }

    build(): ListAttributeValue<T> {
        return this.listAttribute as ListAttributeValue<T>;
    }
}
