import "quill";

declare module "quill" {
    interface Quill extends EventEmitter {
        container: {
            firstChild: {
                innerHTML: string;
            }
        };
    }
}
