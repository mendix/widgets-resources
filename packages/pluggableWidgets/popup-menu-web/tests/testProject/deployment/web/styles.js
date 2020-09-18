import * as custom  from "./styles/native/app/custom";
import mergeobjects from "./styles/native/core/helpers/_functions/mergeobjects";
import * as main    from "./styles/native/main";

Object.keys(custom).forEach(key => {
    if (main[key]) {
        Object.assign(main[key], mergeobjects(main[key], custom[key]));
        delete custom[key];
    }
});

module.exports = { ...main, ...custom };
