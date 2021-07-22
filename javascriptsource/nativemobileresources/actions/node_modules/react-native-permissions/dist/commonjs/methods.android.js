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
  await NativeModule.openSettings();
}

function check(permission) {
  return NativeModule.checkPermission(permission);
}

async function request(permission, rationale) {
  if (rationale) {
    const shouldShowRationale = await NativeModule.shouldShowRequestPermissionRationale(permission);

    if (shouldShowRationale) {
      const {
        title,
        message,
        buttonPositive,
        buttonNegative,
        buttonNeutral
      } = rationale;
      return new Promise(resolve => {
        const buttons = [];

        if (buttonNegative) {
          const onPress = () => resolve(NativeModule.checkPermission(permission));

          buttonNeutral && buttons.push({
            text: buttonNeutral,
            onPress
          });
          buttons.push({
            text: buttonNegative,
            onPress
          });
        }

        buttons.push({
          text: buttonPositive,
          onPress: () => resolve(NativeModule.requestPermission(permission))
        });

        _reactNative.Alert.alert(title, message, buttons, {
          cancelable: false
        });
      });
    }
  }

  return NativeModule.requestPermission(permission);
}

function checkNotifications() {
  return NativeModule.checkNotifications();
}

function checkMultiple(permissions) {
  const dedup = (0, _utils.uniq)(permissions);
  return NativeModule.checkMultiplePermissions(dedup);
}

function requestMultiple(permissions) {
  const dedup = (0, _utils.uniq)(permissions);
  return NativeModule.requestMultiplePermissions(dedup);
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
//# sourceMappingURL=methods.android.js.map