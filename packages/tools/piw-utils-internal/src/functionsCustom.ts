import { EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ValueStatus, ObjectItem } from "mendix";

import { SessionStorageKey } from "./constants";

import Big from "big.js";

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array: any[], key: string, value: string): any {
    if (!Array.isArray(array)) {
        return null;
    }
    return array.find(_ => _[key] === value);
}

export const getAttributeValueToString = (editable?: EditableValue<string | Big | any>, defaultValue = ""): string => {
    const value = getAttributeValue(editable);
    return value || defaultValue;
};

export const getAttributeValue = (editable?: EditableValue<string | Big | any>): string | undefined => {
    if (editable) {
        if (editable.value instanceof Big) {
            return editable.value.toString();
        } else {
            return editable.value;
        }
    }
    return undefined;
};

export const updateAttributeValue = (
    editable?: EditableValue<string | Big | any>,
    value?: string | string[] | any
): void => {
    if (!editable) {
        return;
    }

    if (editable.value instanceof Big) {
        editable.setValue(new Big(value));
    } else {
        let setValue = "";
        if (value instanceof Array) {
            setValue = value.join(",");
        } else {
            setValue = value;
        }

        editable.setValue(setValue);
    }
};

export const listIsLoading = (listValue?: ListValue): boolean => {
    return listValue !== undefined && listValue && listValue.status === ValueStatus.Loading;
};

export const listIsAvailable = (listValue?: ListValue): boolean => {
    return listValue !== undefined && listValue && listValue.status === ValueStatus.Available;
};

let userMenuPaths: string[] = [];

export interface UserMenuType {
    Path: string;
}

/**
 * get image url
 * @param mxObject mendix object
 */
export const getImageUrl = (mxObject: mendix.lib.MxObject): Promise<string> => {
    return new Promise((resolve, reject) => {
        const url = mx.data.getDocumentUrl(mxObject.getGuid(), mxObject.get("changedDate") as number);
        mx.data.getImageUrl(url, objectUrl => resolve(objectUrl), reject);
    });
};

/**
 * get permission path from sessionStorage
 */
export const getAuthPaths = (): string[] => {
    if (userMenuPaths.length > 0) {
        return userMenuPaths;
    }

    const userMenu: UserMenuType[] = JSON.parse(window.sessionStorage.getItem(SessionStorageKey.userMenu) || "[]");

    userMenuPaths = userMenu.map(({ Path }: UserMenuType) => Path).filter(path => !!path);

    return userMenuPaths;
};

/**
 * check auth path
 * @param authPath auth path
 */
export const checkPathPermission = (authPath: string): boolean => {
    if (authPath === "") {
        return true;
    }

    const authPaths = getAuthPaths();

    // if (!authPaths.length) {
    //     return true;
    // }

    return authPaths.indexOf(authPath) !== -1;
};

/**
 * 判断是否有值
 * @returns boolean true为有值
 */
export const valueIsEmpty = (value: string | string[]): boolean => {
    if (value instanceof Array) {
        return value.length <= 0;
    } else if ("undefined" === typeof value) {
        return false;
    } else {
        return value === "" || value.toString().trim() === "";
    }
};

export const valueConvertToString = (value: string | string[]): string => {
    let setValue = "";
    if (value instanceof Array) {
        setValue = value.join(",");
    } else if (value) {
        setValue = value.toString().trim();
    }

    return setValue;
};

export const valueConvertToArray = (value: string | string[]): string[] => {
    if (value instanceof Array) {
        return value;
    }

    let setValues: string[] = [];
    if (value) {
        setValues = [value.toString().trim()];
    }

    return setValues;
};

/**
 * 获取动态数据中指定属性的值
 * @param attr
 * @param item
 * @returns
 */
export const getListAttributeValue = (
    attr?: ListAttributeValue<string | Date | Big> | ListExpressionValue<string>,
    item?: ObjectItem
): any => {
    if (!attr || !item) {
        return undefined;
    }

    if (attr.get && typeof attr.get === "function") {
        return attr.get(item).value;
    }
    return attr(item).value;
};
