"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

// type DhKeysType = {
//   getEncodedPublicKeyFromPg(a: number, b: number): Promise<number>;
// };
const {
  DhKeys
} = _reactNative.NativeModules;
var _default = DhKeys;
exports.default = _default;
//# sourceMappingURL=index.js.map