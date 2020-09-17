import * as custom from "../src/native/js/app/custom";
import mergeobjects from "../src/native/js/core/helpers/_functions/mergeobjects";
import * as main from "../src/native/js/main";

Object.keys(custom).forEach(key => {
    if (main[key]) {
        Object.assign(main[key], mergeobjects(main[key], custom[key]));
        delete custom[key];
    }
});

module.exports = { ...main, ...custom };
