"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalendar = getCalendar;
exports.getCountry = getCountry;
exports.getCurrencies = getCurrencies;
exports.getLocales = getLocales;
exports.getNumberFormatSettings = getNumberFormatSettings;
exports.getTemperatureUnit = getTemperatureUnit;
exports.getTimeZone = getTimeZone;
exports.uses24HourClock = uses24HourClock;
exports.usesMetricSystem = usesMetricSystem;
exports.usesAutoDateAndTime = usesAutoDateAndTime;
exports.usesAutoTimeZone = usesAutoTimeZone;
exports.handlers = void 0;

var _reactNative = require("react-native");

const {
  RNLocalize
} = _reactNative.NativeModules;

if (__DEV__ && RNLocalize == null) {
  throw new Error("react-native-localize: NativeModule.RNLocalize is null. To fix this issue try these steps:\n\u2022 Run `react-native link react-native-localize` in the project root.\n\u2022 Rebuild and re-run the app.\n\u2022 If you are using CocoaPods on iOS, run `pod install` in the `ios` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.\n\u2022 Check that the library was linked correctly when you used the link command by running through the manual installation instructions in the README.\n* If you are getting this error while unit testing you need to mock the native module. Follow the guide in the README.\nIf none of these fix the issue, please open an issue on the Github repository: https://github.com/react-native-community/react-native-localize");
}

let constants = RNLocalize.initialConstants;
const emitter = new _reactNative.NativeEventEmitter(RNLocalize);

function getCalendar() {
  return constants.calendar;
}

function getCountry() {
  return constants.country;
}

function getCurrencies() {
  return constants.currencies;
}

function getLocales() {
  return constants.locales;
}

function getNumberFormatSettings() {
  return constants.numberFormatSettings;
}

function getTemperatureUnit() {
  return constants.temperatureUnit;
}

function getTimeZone() {
  return constants.timeZone;
}

function uses24HourClock() {
  return constants.uses24HourClock;
}

function usesMetricSystem() {
  return constants.usesMetricSystem;
}

function usesAutoDateAndTime() {
  return constants.usesAutoDateAndTime;
}

function usesAutoTimeZone() {
  return constants.usesAutoTimeZone;
}

const handlers = new Set();
exports.handlers = handlers;
emitter.addListener("localizationDidChange", next => {
  if (JSON.stringify(next) !== JSON.stringify(constants)) {
    constants = next;
    handlers.forEach(handler => handler());
  }
});
//# sourceMappingURL=module.js.map