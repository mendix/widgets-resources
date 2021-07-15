"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.findBestAvailableLanguage = findBestAvailableLanguage;
Object.defineProperty(exports, "getCalendar", {
  enumerable: true,
  get: function get() {
    return _module.getCalendar;
  }
});
Object.defineProperty(exports, "getCountry", {
  enumerable: true,
  get: function get() {
    return _module.getCountry;
  }
});
Object.defineProperty(exports, "getCurrencies", {
  enumerable: true,
  get: function get() {
    return _module.getCurrencies;
  }
});
Object.defineProperty(exports, "getLocales", {
  enumerable: true,
  get: function get() {
    return _module.getLocales;
  }
});
Object.defineProperty(exports, "getNumberFormatSettings", {
  enumerable: true,
  get: function get() {
    return _module.getNumberFormatSettings;
  }
});
Object.defineProperty(exports, "getTemperatureUnit", {
  enumerable: true,
  get: function get() {
    return _module.getTemperatureUnit;
  }
});
Object.defineProperty(exports, "getTimeZone", {
  enumerable: true,
  get: function get() {
    return _module.getTimeZone;
  }
});
Object.defineProperty(exports, "uses24HourClock", {
  enumerable: true,
  get: function get() {
    return _module.uses24HourClock;
  }
});
Object.defineProperty(exports, "usesMetricSystem", {
  enumerable: true,
  get: function get() {
    return _module.usesMetricSystem;
  }
});
Object.defineProperty(exports, "usesAutoDateAndTime", {
  enumerable: true,
  get: function get() {
    return _module.usesAutoDateAndTime;
  }
});
Object.defineProperty(exports, "usesAutoTimeZone", {
  enumerable: true,
  get: function get() {
    return _module.usesAutoTimeZone;
  }
});

var _module = require("./module");

function logUnknownEvent(type) {
  console.error("`".concat(type, "` is not a valid react-native-localize event"));
}

function getPartialTag({
  languageCode,
  scriptCode
}) {
  return languageCode + (scriptCode ? "-" + scriptCode : "");
}

function addEventListener(type, handler) {
  if (type !== "change") {
    logUnknownEvent(type);
  } else if (!_module.handlers.has(handler)) {
    _module.handlers.add(handler);
  }
}

function removeEventListener(type, handler) {
  if (type !== "change") {
    logUnknownEvent(type);
  } else if (_module.handlers.has(handler)) {
    _module.handlers.delete(handler);
  }
}

function findBestAvailableLanguage(languageTags) {
  const locales = (0, _module.getLocales)();

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