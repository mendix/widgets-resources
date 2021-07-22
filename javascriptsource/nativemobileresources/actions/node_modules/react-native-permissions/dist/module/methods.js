import { RESULTS } from './results';
import { checkLocationAccuracy, openLimitedPhotoLibraryPicker, requestLocationAccuracy } from './unsupportedPlatformMethods';

async function check() {
  return RESULTS.UNAVAILABLE;
}

async function checkNotifications() {
  return {
    status: RESULTS.UNAVAILABLE,
    settings: {}
  };
}

async function checkMultiple(permissions) {
  return permissions.reduce((acc, permission) => {
    acc[permission] = RESULTS.UNAVAILABLE;
    return acc;
  }, {});
}

export const methods = {
  check,
  checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openLimitedPhotoLibraryPicker,
  openSettings: Promise.reject,
  request: check,
  requestLocationAccuracy,
  requestMultiple: checkMultiple,
  requestNotifications: checkNotifications
};
//# sourceMappingURL=methods.js.map