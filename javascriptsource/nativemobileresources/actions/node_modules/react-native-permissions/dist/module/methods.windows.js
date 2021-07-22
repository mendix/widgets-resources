import { NativeModules } from 'react-native';
import { checkLocationAccuracy, openLimitedPhotoLibraryPicker, requestLocationAccuracy } from './unsupportedPlatformMethods';
import { uniq } from './utils';
const NativeModule = NativeModules.RNPermissions;

async function openSettings() {
  await NativeModule.OpenSettings();
}

function check(permission) {
  return NativeModule.Check(permission);
}

function request(permission) {
  return NativeModule.Request(permission);
}

async function checkNotifications() {
  return {
    status: await NativeModule.CheckNotifications(),
    settings: {}
  };
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
  requestNotifications: checkNotifications
};
//# sourceMappingURL=methods.windows.js.map