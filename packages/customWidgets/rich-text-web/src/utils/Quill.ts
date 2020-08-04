interface Option {
    option: string;
}

export const quillOptions: { [key: string]: any } = {
    align: { align: [] },
    blockQuote: "blockquote",
    bold: "bold",
    bulletList: { list: "bullet" },
    clean: "clean",
    codeBlock: "code-block",
    direction: { direction: "rtl" },
    fillColor: { background: [] },
    headings: { header: [1, 2, 3, 4, 5, 6, false] },
    indent: { indent: "-1" },
    italic: "italic",
    link: "link",
    orderedList: { list: "ordered" },
    outdent: { indent: "+1" },
    strike: "strike",
    subScript: { script: "sub" },
    superScript: { script: "super" },
    textColor: { color: [] },
    underline: "underline"
};

export const getToolbar = (options: Option[] | null): any => {
    const toolbar: { toolbar?: any[] } = {};
    if (options && options.length) {
        toolbar.toolbar = [...parseToolbarOptions(options)];
    }

    return toolbar;
};

const parseToolbarOptions = (options: Option[]): any[] => {
    const validOptions: any[] = [];
    let grouping: any[] = [];
    options.forEach(option => {
        if (option.option === "spacer") {
            validOptions.push(grouping);
            grouping = [];
        } else {
            grouping.push(quillOptions[option.option]);
        }
    });

    if (grouping.length) {
        validOptions.push(grouping);
    }

    return validOptions;
};

export const getBasicOptions = (): any =>
    getToolbar(["bold", "italic", "underline", "spacer", "orderedList", "bulletList"].map(option => ({ option })));

export const getAdvancedOptions = (): any =>
    getToolbar(
        [
            "headings",
            "spacer",
            "bold",
            "italic",
            "underline",
            "strike",
            "textColor",
            "fillColor",
            "spacer",
            "link",
            "spacer",
            "orderedList",
            "bulletList",
            "spacer",
            "indent",
            "outdent",
            "spacer",
            "align",
            "clean"
        ].map(option => ({ option }))
    );
