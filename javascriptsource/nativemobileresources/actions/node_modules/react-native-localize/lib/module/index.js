import { getLocales, handlers } from "./module";
export { getCalendar, getCountry, getCurrencies, getLocales, getNumberFormatSettings, getTemperatureUnit, getTimeZone, uses24HourClock, usesMetricSystem, usesAutoDateAndTime, usesAutoTimeZone } from "./module";

function logUnknownEvent(type) {
  console.error("`".concat(type, "` is not a valid react-native-localize event"));
}

function getPartialTag({
  languageCode,
  scriptCode
}) {
  return languageCode + (scriptCode ? "-" + scriptCode : "");
}

export function addEventListener(type, handler) {
  if (type !== "change") {
    logUnknownEvent(type);
  } else if (!handlers.has(handler)) {
    handlers.add(handler);
  }
}
export function removeEventListener(type, handler) {
  if (type !== "change") {
    logUnknownEvent(type);
  } else if (handlers.has(handler)) {
    handlers.delete(handler);
  }
}
export function findBestAvailableLanguage(languageTags) {
  const locales = getLocales();

  for (let i = 0; i < locales.length; i++) {
    const currentLocale = locales[i];
    const {
      languageTag,
      languageCode,
      isRTL
    } = currentLocale;

    if (languageTags.includes(languageTag)) {
      return {
        languageTag,
        isRTL
      };
    }

    const partial = getPartialTag(currentLocale);
    const next = locales[i + 1];

    if ((!next || partial !== getPartialTag(next)) && languageTags.includes(partial)) {
      return {
        languageTag: partial,
        isRTL
      };
    }

    if ((!next || languageCode !== next.languageCode) && languageTags.includes(languageCode)) {
      return {
        languageTag: languageCode,
        isRTL
      };
    }
  }
}
//# sourceMappingURL=index.js.map