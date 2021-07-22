import { NativeModules, NativeEventEmitter } from "react-native";
const {
  RNLocalize
} = NativeModules;

if (__DEV__ && RNLocalize == null) {
  throw new Error("react-native-localize: NativeModule.RNLocalize is null. To fix this issue try these steps:\n\u2022 Run `react-native link react-native-localize` in the project root.\n\u2022 Rebuild and re-run the app.\n\u2022 If you are using CocoaPods on iOS, run `pod install` in the `ios` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.\n\u2022 Check that the library was linked correctly when you used the link command by running through the manual installation instructions in the README.\n* If you are getting this error while unit testing you need to mock the native module. Follow the guide in the README.\nIf none of these fix the issue, please open an issue on the Github repository: https://github.com/react-native-community/react-native-localize");
}

let constants = RNLocalize.initialConstants;
const emitter = new NativeEventEmitter(RNLocalize);
export function getCalendar() {
  return constants.calendar;
}
export function getCountry() {
  return constants.country;
}
export function getCurrencies() {
  return constants.currencies;
}
export function getLocales() {
  return constants.locales;
}
export function getNumberFormatSettings() {
  return constants.numberFormatSettings;
}
export function getTemperatureUnit() {
  return constants.temperatureUnit;
}
export function getTimeZone() {
  return constants.timeZone;
}
export function uses24HourClock() {
  return constants.uses24HourClock;
}
export function usesMetricSystem() {
  return constants.usesMetricSystem;
}
export function usesAutoDateAndTime() {
  return constants.usesAutoDateAndTime;
}
export function usesAutoTimeZone() {
  return constants.usesAutoTimeZone;
}
export const handlers = new Set();
emitter.addListener("localizationDidChange", next => {
  if (JSON.stringify(next) !== JSON.stringify(constants)) {
    constants = next;
    handlers.forEach(handler => handler());
  }
});
//# sourceMappingURL=module.js.map