export interface MxUiFormBase extends mxui.lib.form._FormBase {
    getContext: () => mendix.lib.MxContext;
}

export interface MxUi extends mx.ui {
    getContentForm: () => MxUiFormBase;
}

export const fetchObjectOverPath = (obj: mendix.lib.MxObject, attr = ""): Promise<mendix.lib.MxObject | null> =>
    new Promise((resolve, reject) => {
        if (attr === "") {
            reject(new Error("Attribute to fetch cannot be empty!"));
        } else {
            try {
                obj.fetch(attr, resolve);
            } catch (error) {
                reject(error);
            }
        }
    });
