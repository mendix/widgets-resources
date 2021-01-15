// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace mx {
    interface ui extends mx.ui {
        toggleSidebar: () => void;
    }
    interface data extends mx.data {
        update: (param: { guid?: string | undefined; entity?: string | undefined; callback?: () => void }) => void;
    }
}
