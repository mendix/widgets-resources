interface Cordova {
    plugins?: CordovaPlugins;
}

interface CordovaPlugins {
    clipboard?: CordovaClipboard;
}

interface CordovaClipboard {
    copy(content: string);
    paste(contentCallback: (content: string) => void);
    clear();
}
