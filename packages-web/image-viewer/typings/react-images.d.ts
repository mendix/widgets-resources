/* tslint:disable */
declare module "react-images" {
    interface image {
        src?: string,
        srcset?: string,
        caption?: string,
        thumbnail?: string
    }

    interface LightboxProps {
        backdropClosesModal?: boolean;
        currentImage?: number;
        customControls?: any[];
        enableKeyboardInput?: boolean;
        images?: image[];
        imageCountSeparator?: string;
        isOpen?: boolean;
        onClickPrev?: () => void;
        onClickNext?: () => void;
        onClickImage?: () => void;
        onClickThumbnail?: () => void;
        onClose?: () => void;
        preloadNextImage?: boolean;
        showCloseButton?: boolean;
        showImageCount?: boolean;
        showThumbnails?: boolean;
        theme?: Object;
        width?: number
    }

    interface Lightbox extends React.ComponentClass<LightboxProps> {}

    var LightboxInstance: Lightbox;
    export = LightboxInstance;
}
