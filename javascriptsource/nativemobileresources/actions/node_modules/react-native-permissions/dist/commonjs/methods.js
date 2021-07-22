"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;

var _results = require("./results");

var _unsupportedPlatformMethods = require("./unsupportedPlatformMethods");

async function check() {
  return _results.RESULTS.UNAVAILABLE;
}

async function checkNotifications() {
  return {
    status: _results.RESULTS.UNAVAILABLE,
    settings: {}
  };
}

async function checkMultiple(permissions) {
  return permissions.reduce((acc, permission) => {
    acc[permission] = _results.RESULTS.UNAVAILABLE;
    return acc;
  }, {});
}

const methods = {
  check,
  checkLocationAccuracy: _unsupportedPlatformMethods.checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openLimitedPhotoLibraryPicker: _unsupportedPlatformMethods.openLimitedPhotoLibraryPicker,
  openSettings: Promise.reject,
  request: check,
  requestLocationAccuracy: _unsupportedPlatformMethods.requestLocationAccuracy,
  requestMultiple: checkMultiple,
  requestNotifications: checkNotifications
};
exports.methods = methods;
//# sourceMappingURL=methods.js.map