const IOS_14 = 'Only supported by iOS 14 and above';
export async function checkLocationAccuracy() {
  throw new Error(IOS_14);
}
export async function requestLocationAccuracy(_options) {
  throw new Error(IOS_14);
}
export async function openLimitedPhotoLibraryPicker() {
  throw new Error(IOS_14);
}
//# sourceMappingURL=unsupportedPlatformMethods.js.map