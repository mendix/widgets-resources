import { USES_FAHRENHEIT, USES_IMPERIAL, USES_RTL_LAYOUT, CURRENCIES } from "./constants";
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
    isRTL: USES_RTL_LAYOUT.includes(languageCode)
  };
}

function getCurrentLocale() {
  return convertLanguageTagToLocale(navigator.language, getCountry());
}

export function getCalendar() {
  return "gregorian";
}
export function getCountry() {
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
export function getCurrencies() {
  const {
    languages
  } = navigator;
  const currencies = [];
  languages.forEach(language => {
    const {
      countryCode
    } = splitLanguageTag(language);

    if (countryCode) {
      const currency = CURRENCIES[ensureCountryCode(countryCode)];

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
export function getLocales() {
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
export function getNumberFormatSettings() {
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
export function getTemperatureUnit() {
  return USES_FAHRENHEIT.includes(getCountry()) ? "fahrenheit" : "celsius";
}
export function getTimeZone() {
  const {
    languageTag
  } = getCurrentLocale();
  const formatter = new Intl.DateTimeFormat(languageTag, {
    hour: "numeric"
  });
  return formatter.resolvedOptions().timeZone || "Etc/UTC";
}
export function uses24HourClock() {
  const {
    languageTag
  } = getCurrentLocale();
  const formatter = new Intl.DateTimeFormat(languageTag, {
    hour: "numeric"
  });
  return !formatter.format(new Date(2000, 0, 1, 20)).match(/am|pm/i);
}
export function usesMetricSystem() {
  return !USES_IMPERIAL.includes(getCountry());
}
export function usesAutoDateAndTime() {}
export function usesAutoTimeZone() {}
export const handlers = new Set();

if (canUseDOM) {
  window.addEventListener("languagechange", () => {
    handlers.forEach(handler => handler());
  });
}
//# sourceMappingURL=module.web.js.map