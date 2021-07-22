"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;

var _reactNative = require("react-native");

var _unsupportedPlatformMethods = require("./unsupportedPlatformMethods");

var _utils = require("./utils");

const NativeModule = _reactNative.NativeModules.RNPermissions;

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
  const dedup = (0, _utils.uniq)(permissions);
  await Promise.all(dedup.map(async permission => {
    output[permission] = await check(permission);
  }));
  return output;
}

async function requestMultiple(permissions) {
  const output = {};
  const dedup = (0, _utils.uniq)(permissions);

  for (let index = 0; index < dedup.length; index++) {
    const permission = dedup[index];
    output[permission] = await request(permission);
  }

  return output;
}

const methods = {
  check,
  checkLocationAccuracy: _unsupportedPlatformMethods.checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openLimitedPhotoLibraryPicker: _unsupportedPlatformMethods.openLimitedPhotoLibraryPicker,
  openSettings,
  request,
  requestLocationAccuracy: _unsupportedPlatformMethods.requestLocationAccuracy,
  requestMultiple,
  requestNotifications: checkNotifications
};
exports.methods = methods;
//# sourceMappingURL=methods.windows.js.map