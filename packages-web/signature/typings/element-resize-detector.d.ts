declare module "element-resize-detector" {
    interface ResizeDetector {
        listenTo: (element: HTMLElement, callback: () => void) => void;
        removeListener: (element: HTMLElement, callback: () => void) => void;
    }

    interface ResizeOptions {
        strategy: "scroll";
    }

    const elementResizeDetector: (options: ResizeOptions) => ResizeDetector;

    export = elementResizeDetector;
}
