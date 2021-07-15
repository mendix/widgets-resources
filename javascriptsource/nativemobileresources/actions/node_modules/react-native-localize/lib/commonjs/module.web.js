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

var _constants = require("./constants");

const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

function ensureCountryCode(countryCode) {
  return countryCode === "419" ? "UN" : countryCode.toUpperCase();
}

function splitLanguageTag(languageTag) {
  const [languageCode, countryCode] = languageTag.split("-");
  return {
    languageCode,
    countryCode
  };
}

function convertLanguageTagToLocale(languageTag, countryCodeFallback) {
  let {
    languageCode,
    countryCode
  } = splitLanguageTag(languageTag);
  languageCode = languageCode.toLowerCase();
  countryCode = ensureCountryCode(countryCode || countryCodeFallback);
  return {
    languageCode,
    countryCode,
    languageTag: "".concat(languageCode, "-").concat(countryCode),
    isRTL: _constants.USES_RTL_LAYOUT.includes(languageCode)
  };
}

function getCurrentLocale() {
  return convertLanguageTagToLocale(navigator.language, getCountry());
}

function getCalendar() {
  return "gregorian";
}

function getCountry() {
  const {
    languages
  } = navigator;

  for (let i = 0; i < languages.length; i++) {
    const {
      countryCode
    } = splitLanguageTag(languages[i]);

    if (countryCode) {
      return ensureCountryCode(countryCode);
    }
  }

  return "US";
}

function getCurrencies() {
  const {
    languages
  } = navigator;
  const currencies = [];
  languages.forEach(language => {
    const {
      countryCode
    } = splitLanguageTag(language);

    if (countryCode) {
      const currency = _constants.CURRENCIES[ensureCountryCode(countryCode)];

      if (currencies.indexOf(currency) === -1) {
        currencies.push(currency);
      }
    }
  });

  if (currencies.length === 0) {
    currencies.push("USD");
  }

  return currencies;
}

function getLocales() {
  const {
    languages
  } = navigator;
  const countryCode = getCountry();
  const cache = [];
  const locales = [];
  languages.forEach(language => {
    const locale = convertLanguageTagToLocale(language, countryCode);

    if (cache.indexOf(locale.languageTag) === -1) {
      locales.push(locale);
      cache.push(locale.languageTag);
    }
  });
  return locales;
}

function getNumberFormatSettings() {
  const {
    languageTag
  } = getCurrentLocale();
  const formatter = new Intl.NumberFormat(languageTag);
  const separators = [...formatter.format(1000000.1).replace(/\d/g, "")];
  return {
    decimalSeparator: separators[separators.length - 1],
    groupingSeparator: separators[0]
  };
}

function getTemperatureUnit() {
  return _constants.USES_FAHRENHEIT.includes(getCountry()) ? "fahrenheit" : "celsius";
}

function getTimeZone() {
  const {
    languageTag
  } = getCurrentLocale();
  const formatter = new Intl.DateTimeFormat(languageTag, {
    hour: "numeric"
  });
  return formatter.resolvedOptions().timeZone || "Etc/UTC";
}

function uses24HourClock() {
  const {
    languageTag
  } = getCurrentLocale();
  const formatter = new Intl.DateTimeFormat(languageTag, {
    hour: "numeric"
  });
  return !formatter.format(new Date(2000, 0, 1, 20)).match(/am|pm/i);
}

function usesMetricSystem() {
  return !_constants.USES_IMPERIAL.includes(getCountry());
}

function usesAutoDateAndTime() {}

function usesAutoTimeZone() {}

const handlers = new Set();
exports.handlers = handlers;

if (canUseDOM) {
  window.addEventListener("languagechange", () => {
    handlers.forEach(handler => handler());
  });
}
//# sourceMappingURL=module.web.js.map