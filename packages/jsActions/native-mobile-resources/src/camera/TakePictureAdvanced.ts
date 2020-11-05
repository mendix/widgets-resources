// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { Alert, Linking, NativeModules } from "react-native";
import ImagePicker from "react-native-image-picker";

type PictureSource = "camera" | "imageLibrary" | "either";

type PictureQuality = "original" | "low" | "medium" | "high" | "custom";

/**
 * Take a picture using the camera or import one from the image library on the device.
 *
 * The result is an ImageMetaData object. Most items are self-explanatory.
 *
 * The FileType is not the extension but the mime type, for example image/jpeg when the image is a jpg file
 * You can get the right extension from the FileName:
 * substring($ImageMetaData/FileName, findLast($ImageMetaData/FileName, '.'))
 *
 * @param {MxObject} picture - This field is required.
 * @param {"NativeMobileResources.PictureSource.camera"|"NativeMobileResources.PictureSource.imageLibrary"|"NativeMobileResources.PictureSource.either"} pictureSource - Select a picture from the library or the camera. The default is to let the user decide.
 * @param {"NativeMobileResources.PictureQuality.original"|"NativeMobileResources.PictureQuality.low"|"NativeMobileResources.PictureQuality.medium"|"NativeMobileResources.PictureQuality.high"|"NativeMobileResources.PictureQuality.custom"} pictureQuality - The default picture quality is 'Medium'.
 * @param {Big} maximumWidth - The picture will be scaled to this maximum pixel width, while maintaining the aspect ratio.
 * @param {Big} maximumHeight - The picture will be scaled to this maximum pixel height, while maintaining the aspect ratio.
 * @param {MxObject} pictureData - Additional info about the picture will be stored in this object. Create it before calling this action.
 * @returns {Promise.<mendix.lib.MxObject>}
 */
export async function TakePictureAdvanced(
    picture?: mendix.lib.MxObject,
    pictureSource?: PictureSource,
    pictureQuality?: PictureQuality,
    maximumWidth?: BigJs.Big,
    maximumHeight?: BigJs.Big
): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md

    return new Promise((resolve, reject) => {
        if (!picture) {
            return reject(new Error("Input parameter 'Picture' is required"));
        }
        if (!picture.inheritsFrom("System.FileDocument")) {
            const entity = picture.getEntity();
            return reject(new Error(`Entity ${entity} does not inherit from 'System.FileDocument'`));
        }
        if (pictureQuality === "custom" && !maximumHeight && !maximumWidth) {
            return reject(new Error("Picture quality is set to 'Custom', but no maximum width or height was provided"));
        }
        createMxObject("NativeMobileResources.ImageMetaData").then((resultObject: any) => {
            takePicture()
                .then((response: any) => {
                    if (!response || !response.uri) {
                        return resolve(resultObject);
                    }
                    // eslint-disable-next-line no-useless-escape
                    const fileName = response.fileName ? response.fileName : /[^\/]*$/.exec(response.uri)![0];
                    storeFile(picture, response.uri).then(pictureTaken => {
                        resultObject.set("PictureTaken", pictureTaken);
                        resultObject.set("URI", response.uri);
                        resultObject.set("IsVertical", response.isVertical);
                        resultObject.set("Width", response.width);
                        resultObject.set("Height", response.height);
                        resultObject.set("FileName", fileName);
                        resultObject.set("FileSize", response.fileSize);
                        resultObject.set("FileType", response.type);
                        resolve(resultObject);
                    });
                })
                .catch(error => {
                    if (error === "canceled") {
                        resolve(resultObject);
                    } else {
                        throw new Error(error);
                    }
                });
        });
    });

    function takePicture(): Promise<object> {
        return new Promise((resolve, reject) => {
            const options = getOptions();
            const method = getPictureMethod();

            method(options, response => {
                if (response.didCancel) {
                    return resolve();
                }

                if (response.error) {
                    const unhandledError = handleImagePickerError(response.error);
                    if (!unhandledError) {
                        return resolve();
                    }
                    return reject(new Error(response.error));
                }
                return resolve(response);
            });
        });
    }

    function storeFile(imageObject: mendix.lib.MxObject, uri: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(uri)
                .then(res => res.blob())
                .then(blob => {
                    const guid = imageObject.getGuid();
                    // eslint-disable-next-line no-useless-escape
                    const filename = /[^\/]*$/.exec(uri)![0];
                    const onSuccess = (): void => {
                        NativeModules.NativeFsModule.remove(uri).then(() => {
                            imageObject.set("Name", filename);
                            mx.data.commit({
                                mxobj: imageObject,
                                callback: () => resolve(true),
                                error: (error: Error) => reject(error)
                            });
                        });
                    };
                    const onError = (error: Error): void => {
                        NativeModules.NativeFsModule.remove(uri).then(undefined);
                        reject(error);
                    };

                    mx.data.saveDocument(guid, filename, {}, blob, onSuccess, onError);
                });
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function getPictureMethod() {
        const source = pictureSource ? pictureSource : "either";

        switch (source) {
            case "imageLibrary":
                return ImagePicker.launchImageLibrary;
            case "camera":
                return ImagePicker.launchCamera;
            case "either":
            default:
                return ImagePicker.showImagePicker;
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function getOptions() {
        const { maxWidth, maxHeight } = getPictureQuality();

        return {
            mediaType: "photo" as "photo",
            maxWidth,
            maxHeight,
            noData: true,
            permissionDenied: {
                title: "This app does not have access to your camera or photos",
                text: "To enable access, tap Settings > Permissions and turn on Camera and Storage.",
                reTryTitle: "Settings",
                okTitle: "Cancel"
            },
            storageOptions: {
                skipBackup: true,
                cameraRoll: false,
                privateDirectory: true
            }
        };
    }

    function getPictureQuality(): { maxWidth: number; maxHeight: number } {
        switch (pictureQuality) {
            case "low":
                return {
                    maxWidth: 1024,
                    maxHeight: 1024
                };
            case "medium":
            default:
                return {
                    maxWidth: 2048,
                    maxHeight: 2048
                };
            case "high":
                return {
                    maxWidth: 4096,
                    maxHeight: 4096
                };
            case "custom":
                return {
                    maxWidth: Number(maximumWidth),
                    maxHeight: Number(maximumHeight)
                };
        }
    }

    function handleImagePickerError(error: string): string | undefined {
        const ERRORS = {
            AndroidPermissionDenied: "Permissions weren't granted",
            iOSPhotoLibraryPermissionDenied: "Photo library permissions not granted",
            iOSCameraPermissionDenied: "Camera permissions not granted"
        };

        switch (error) {
            case ERRORS.iOSPhotoLibraryPermissionDenied:
                showiOSPermissionAlert(
                    "This app does not have access to your photos or videos",
                    "To enable access, tap Settings and turn on Photos."
                );
                return;

            case ERRORS.iOSCameraPermissionDenied:
                showiOSPermissionAlert(
                    "This app does not have access to your camera",
                    "To enable access, tap Settings and turn on Camera."
                );
                return;

            case ERRORS.AndroidPermissionDenied:
                // Ignore this error because the image picker plugin already shows an alert in this case.
                return;

            default:
                return error;
        }
    }

    function showiOSPermissionAlert(title: string, message: string): void {
        Alert.alert(
            title,
            message,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Settings", onPress: () => Linking.openURL("app-settings:") }
            ],
            { cancelable: false }
        );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function createMxObject(entity: string) {
        return new Promise((resolve, reject) => {
            mx.data.create({
                entity,
                callback: mxObject => resolve(mxObject),
                error: () => reject(new Error(`Could not create '${entity}' object to store device info`))
            });
        });
    }

    // END USER CODE
}
