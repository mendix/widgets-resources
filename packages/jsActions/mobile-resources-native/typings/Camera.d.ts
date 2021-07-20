export type PictureSource = "camera" | "imageLibrary";

export type PictureQuality = "original" | "low" | "medium" | "high" | "custom";

export interface ImagePickerV2Response {
    customButton: string;
    didCancel: boolean;
    error: string;
    data: string;
    uri: string;
    origURL?: string;
    isVertical: boolean;
    width: number;
    height: number;
    fileSize: number;
    type?: string;
    fileName?: string;
    path?: string;
    latitude?: number;
    longitude?: number;
    timestamp?: string;
}

export interface ImagePickerV2Options {
    title?: string;
    cancelButtonTitle?: string;
    takePhotoButtonTitle?: string;
    chooseFromLibraryButtonTitle?: string;
    chooseWhichLibraryTitle?: string;
    customButtons?: Array<{
        name?: string;
        title?: string;
    }>;
    cameraType?: "front" | "back";
    mediaType?: "photo" | "video" | "mixed";
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    videoQuality?: "low" | "medium" | "high";
    durationLimit?: number;
    rotation?: number;
    allowsEditing?: boolean;
    noData?: boolean;
    storageOptions?: {
        skipBackup?: boolean;
        path?: string;
        cameraRoll?: boolean;
        waitUntilSaved?: boolean;
        privateDirectory?: boolean;
    };
    permissionDenied?: {
        title: string;
        text: string;
        reTryTitle: string;
        okTitle: string;
    };
    tintColor?: number | string;
}
