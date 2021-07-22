import { NativeModules } from 'react-native';
import { RESULTS } from './results';
import { uniq } from './utils';
const NativeModule = NativeModules.RNPermissions;

async function openLimitedPhotoLibraryPicker() {
  await NativeModule.openLimitedPhotoLibraryPicker();
}

async function openSettings() {
  await NativeModule.openSettings();
}

async function check(permission) {
  return NativeModule.available.includes(permission) ? NativeModule.check(permission) : RESULTS.UNAVAILABLE;
}

async function request(permission) {
  return NativeModule.available.includes(permission) ? NativeModule.request(permission) : RESULTS.UNAVAILABLE;
}

function checkLocationAccuracy() {
  return NativeModule.checkLocationAccuracy();
}

function requestLocationAccuracy(options) {
  return NativeModule.requestLocationAccuracy(options.purposeKey);
}

export function checkNotifications() {
  return NativeModule.checkNotifications();
}
export function requestNotifications(options) {
  return NativeModule.requestNotifications(options);
}

async function checkMultiple(permissions) {
  const output = {};
  const dedup = uniq(permissions);
  await Promise.all(dedup.map(async permission => {
    output[permission] = await check(permission);
  }));
  return output;
}

async function requestMultiple(permissions) {
  const output = {};
  const dedup = uniq(permissions);

  for (let index = 0; index < dedup.length; index++) {
    const permission = dedup[index];
    output[permission] = await request(permission);
  }

  return output;
}

export const methods = {
  check,
  checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openLimitedPhotoLibraryPicker,
  openSettings,
  request,
  requestLocationAccuracy,
  requestMultiple,
  requestNotifications
};
//# sourceMappingURL=methods.ios.js.map