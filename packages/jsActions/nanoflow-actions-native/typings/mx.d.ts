// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace mx {
    interface ui {
        toggleSidebar: () => void;
    }
    interface data {
        update: (param: { guid?: string | undefined; entity?: string | undefined; callback?: () => void }) => void;
    }
    interface session {
        clearCachedSessionData: () => Promise<void>;
    }
    interface MxInterface {
        reload: () => void;
    }
}
