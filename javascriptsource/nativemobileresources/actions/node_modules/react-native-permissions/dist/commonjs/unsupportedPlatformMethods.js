"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLocationAccuracy = checkLocationAccuracy;
exports.requestLocationAccuracy = requestLocationAccuracy;
exports.openLimitedPhotoLibraryPicker = openLimitedPhotoLibraryPicker;
const IOS_14 = 'Only supported by iOS 14 and above';

async function checkLocationAccuracy() {
  throw new Error(IOS_14);
}

async function requestLocationAccuracy(_options) {
  throw new Error(IOS_14);
}

async function openLimitedPhotoLibraryPicker() {
  throw new Error(IOS_14);
}
//# sourceMappingURL=unsupportedPlatformMethods.js.map