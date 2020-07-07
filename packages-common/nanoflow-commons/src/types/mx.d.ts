declare namespace mx {
    // eslint-disable-next-line @typescript-eslint/class-name-casing
    interface ui extends mx.ui {
        toggleSidebar: () => void;
    }
    // eslint-disable-next-line @typescript-eslint/class-name-casing
    interface data extends mx.data {
        update: (param: { guid?: string | undefined; entity?: string | undefined; callback?: () => void }) => void;
    }
}
