"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniq = uniq;

function uniq(array) {
  return array.filter((item, index) => item != null && array.indexOf(item) === index);
}
//# sourceMappingURL=utils.js.map