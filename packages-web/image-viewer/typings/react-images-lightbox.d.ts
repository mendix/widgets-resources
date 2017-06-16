/* tslint:disable */
declare module "react-image-lightbox" {
    interface LightboxProps {
        mainSrc: string;
        prevSrc?: string;
        nextSrc?: string;
        mainSrcThumbnail?: string;
        prevSrcThumbnail?: string;
        nextSrcThumbnail?: string;
        onCloseRequest: () => void;
        onMovePrevRequest?: () => void;
        onMoveNextRequest?: () => void;
        onImageLoadError?: () => void;
        onAfterOpen?: () => void;
        discourageDownloads?: boolean;
        animationDisabled?: boolean;
        animationOnKeyInput?: boolean;
        animationDuration?: number;
        keyRepeatLimit?: number;
        keyRepeatKeyupBonus?: number;
        imageTitle?: React.ReactNode;
        imageCaption?: React.ReactNode;
        toolbarButtons?: React.ReactNode[];
        reactModalStyle?: Object;
        imagePadding?: number;
        clickOutsideToClose?: boolean;
        enableZoom?: boolean;
    }

    interface Lightbox extends React.ComponentClass<LightboxProps> {}

    var LightboxInstance: Lightbox;
    export = LightboxInstance;
}
