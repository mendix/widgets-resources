"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNotifications = checkNotifications;
exports.requestNotifications = requestNotifications;
exports.methods = void 0;

var _reactNative = require("react-native");

var _results = require("./results");

var _utils = require("./utils");

const NativeModule = _reactNative.NativeModules.RNPermissions;

async function openLimitedPhotoLibraryPicker() {
  await NativeModule.openLimitedPhotoLibraryPicker();
}

async function openSettings() {
  await NativeModule.openSettings();
}

async function check(permission) {
  return NativeModule.available.includes(permission) ? NativeModule.check(permission) : _results.RESULTS.UNAVAILABLE;
}

async function request(permission) {
  return NativeModule.available.includes(permission) ? NativeModule.request(permission) : _results.RESULTS.UNAVAILABLE;
}

function checkLocationAccuracy() {
  return NativeModule.checkLocationAccuracy();
}

function requestLocationAccuracy(options) {
  return NativeModule.requestLocationAccuracy(options.purposeKey);
}

function checkNotifications() {
  return NativeModule.checkNotifications();
}

function requestNotifications(options) {
  return NativeModule.requestNotifications(options);
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
exports.methods = methods;
//# sourceMappingURL=methods.ios.js.map