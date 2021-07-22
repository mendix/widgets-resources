import { Alert, NativeModules } from 'react-native';
import { checkLocationAccuracy, openLimitedPhotoLibraryPicker, requestLocationAccuracy } from './unsupportedPlatformMethods';
import { uniq } from './utils';
const NativeModule = NativeModules.RNPermissions;

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
        Alert.alert(title, message, buttons, {
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
  const dedup = uniq(permissions);
  return NativeModule.checkMultiplePermissions(dedup);
}

function requestMultiple(permissions) {
  const dedup = uniq(permissions);
  return NativeModule.requestMultiplePermissions(dedup);
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
//# sourceMappingURL=methods.android.js.map