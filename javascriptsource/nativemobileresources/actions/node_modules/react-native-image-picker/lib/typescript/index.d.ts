/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ImagePickerOptions, ImagePickerResponse } from './internal/types';
declare type Callback = (response: ImagePickerResponse) => void;
declare class ImagePicker {
    showImagePicker(options: ImagePickerOptions, callback: Callback): void;
    showImagePicker(callback: Callback): void;
    launchCamera(options: ImagePickerOptions, callback: Callback): void;
    launchImageLibrary(options: ImagePickerOptions, callback: Callback): void;
}
declare const _default: ImagePicker;
export default _default;
export * from './internal/types';
