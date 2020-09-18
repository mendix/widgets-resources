module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Signature.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!********************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}module.exports=_arrayLikeToArray;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}module.exports=_arrayWithHoles;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/extends.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/extends.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends(){module.exports=_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};return _extends.apply(this,arguments);}module.exports=_extends;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!*************************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}module.exports=_interopRequireDefault;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof=__webpack_require__(/*! ../helpers/typeof */ "../../../node_modules/@babel/runtime/helpers/typeof.js");function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function _getRequireWildcardCache(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{"default":obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj["default"]=obj;if(cache){cache.set(obj,newObj);}return newObj;}module.exports=_interopRequireWildcard;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!************************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}module.exports=_iterableToArrayLimit;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!*******************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}module.exports=_nonIterableRest;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!*****************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles=__webpack_require__(/*! ./arrayWithHoles */ "../../../node_modules/@babel/runtime/helpers/arrayWithHoles.js");var iterableToArrayLimit=__webpack_require__(/*! ./iterableToArrayLimit */ "../../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");var unsupportedIterableToArray=__webpack_require__(/*! ./unsupportedIterableToArray */ "../../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");var nonIterableRest=__webpack_require__(/*! ./nonIterableRest */ "../../../node_modules/@babel/runtime/helpers/nonIterableRest.js");function _slicedToArray(arr,i){return arrayWithHoles(arr)||iterableToArrayLimit(arr,i)||unsupportedIterableToArray(arr,i)||nonIterableRest();}module.exports=_slicedToArray;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/typeof.js":
/*!**********************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/typeof.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){module.exports=_typeof=function _typeof(obj){return typeof obj;};}else{module.exports=_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}module.exports=_typeof;

/***/ }),

/***/ "../../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!******************************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray=__webpack_require__(/*! ./arrayLikeToArray */ "../../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return arrayLikeToArray(o,minLen);}module.exports=_unsupportedIterableToArray;

/***/ }),

/***/ "../../../node_modules/classnames/index.js":
/*!*********************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/node_modules/classnames/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(){'use strict';var hasOwn={}.hasOwnProperty;function classNames(){var classes=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(!arg)continue;var argType=typeof arg;if(argType==='string'||argType==='number'){classes.push(arg);}else if(Array.isArray(arg)&&arg.length){var inner=classNames.apply(null,arg);if(inner){classes.push(inner);}}else if(argType==='object'){for(var key in arg){if(hasOwn.call(arg,key)&&arg[key]){classes.push(key);}}}}return classes.join(' ');}if( true&&module.exports){classNames.default=classNames;module.exports=classNames;}else if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return classNames;}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else{}})();

/***/ }),

/***/ "../../tools/piw-utils/dist/builders/ListValueBuilder.js":
/*!***********************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/builders/ListValueBuilder.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:true});exports.ListValueBuilder=ListValueBuilder;var _extends2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../node_modules/@babel/runtime/helpers/extends.js"));function ListValueBuilder(){var listValue={status:"available",offset:0,limit:1,items:[{id:"1"},{id:"2"}],totalCount:2,hasMoreItems:false,setLimit:jest.fn(),setOffset:jest.fn()};return{withItems:function withItems(items){return(0,_extends2.default)((0,_extends2.default)({},listValue),{items:items,totalCount:items.length});},withAmountOfItems:function withAmountOfItems(amount){var items=[];for(var i=0;i<amount;i++){items.push({id:i.toString()});}return this.withItems(items);},isLoading:function isLoading(){return(0,_extends2.default)((0,_extends2.default)({},listValue),{status:"loading"});},isUnavailable:function isUnavailable(){return(0,_extends2.default)((0,_extends2.default)({},listValue),{status:"unavailable"});},simple:function simple(){return listValue;}};}

/***/ }),

/***/ "../../tools/piw-utils/dist/builders/index.js":
/*!************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/builders/index.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _ListValueBuilder=__webpack_require__(/*! ./ListValueBuilder */ "../../tools/piw-utils/dist/builders/ListValueBuilder.js");Object.keys(_ListValueBuilder).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _ListValueBuilder[key];}});});

/***/ }),

/***/ "../../tools/piw-utils/dist/components.js":
/*!********************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/components.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:true});exports.Alert=void 0;var _react=__webpack_require__(/*! react */ "react");var _classnames=_interopRequireDefault(__webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js"));var Alert=function Alert(_ref){var className=_ref.className,bootstrapStyle=_ref.bootstrapStyle,children=_ref.children;return _react.Children.count(children)>0?(0,_react.createElement)("div",{className:(0,_classnames.default)("alert alert-"+bootstrapStyle,className)},children):null;};exports.Alert=Alert;Alert.displayName="Alert";

/***/ }),

/***/ "../../tools/piw-utils/dist/functions.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/functions.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.parseStyle=exports.isAvailable=exports.executeAction=void 0;var executeAction=function executeAction(action){if(action&&action.canExecute&&!action.isExecuting){action.execute();}};exports.executeAction=executeAction;var isAvailable=function isAvailable(property){return property&&property.status==="available"&&property.value;};exports.isAvailable=isAvailable;var parseStyle=function parseStyle(){var style=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";try{return style.split(";").reduce(function(styleObject,line){var pair=line.split(":");if(pair.length===2){var name=pair[0].trim().replace(/(-.)/g,function(match){return match[1].toUpperCase();});styleObject[name]=pair[1].trim();}return styleObject;},{});}catch(_){return{};}};exports.parseStyle=parseStyle;

/***/ }),

/***/ "../../tools/piw-utils/dist/index.js":
/*!***************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/index.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _components=__webpack_require__(/*! ./components */ "../../tools/piw-utils/dist/components.js");Object.keys(_components).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _components[key];}});});var _functions=__webpack_require__(/*! ./functions */ "../../tools/piw-utils/dist/functions.js");Object.keys(_functions).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _functions[key];}});});var _builders=__webpack_require__(/*! ./builders */ "../../tools/piw-utils/dist/builders/index.js");Object.keys(_builders).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _builders[key];}});});var _utils=__webpack_require__(/*! ./utils */ "../../tools/piw-utils/dist/utils/index.js");Object.keys(_utils).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _utils[key];}});});var _typings=__webpack_require__(/*! ./typings */ "../../tools/piw-utils/dist/typings/index.js");Object.keys(_typings).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _typings[key];}});});

/***/ }),

/***/ "../../tools/piw-utils/dist/typings/PageEditor.js":
/*!****************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/typings/PageEditor.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../tools/piw-utils/dist/typings/index.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/typings/index.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _PageEditor=__webpack_require__(/*! ./PageEditor */ "../../tools/piw-utils/dist/typings/PageEditor.js");Object.keys(_PageEditor).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _PageEditor[key];}});});

/***/ }),

/***/ "../../tools/piw-utils/dist/utils/PageEditorUtils.js":
/*!*******************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/utils/PageEditorUtils.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.hidePropertyIn=hidePropertyIn;exports.hidePropertiesIn=hidePropertiesIn;exports.changePropertyIn=changePropertyIn;function hidePropertyIn(propertyGroups,_value,key,nestedPropIndex,nestedPropKey){modifyProperty(function(_,index,container){return container.splice(index,1);},propertyGroups,key,nestedPropIndex,nestedPropKey);}function hidePropertiesIn(propertyGroups,_value,keys){keys.forEach(function(key){return modifyProperty(function(_,index,container){return container.splice(index,1);},propertyGroups,key,undefined,undefined);});}function changePropertyIn(propertyGroups,_value,modify,key,nestedPropIndex,nestedPropKey){modifyProperty(modify,propertyGroups,key,nestedPropIndex,nestedPropKey);}function modifyProperty(modify,propertyGroups,key,nestedPropIndex,nestedPropKey){propertyGroups.forEach(function(propGroup){var _a;if(propGroup.propertyGroups){modifyProperty(modify,propGroup.propertyGroups,key,nestedPropIndex,nestedPropKey);}(_a=propGroup.properties)===null||_a===void 0?void 0:_a.forEach(function(prop,index,array){if(prop.key===key){if(nestedPropIndex===undefined||nestedPropKey===undefined){modify(prop,index,array);}else if(prop.objects){modifyProperty(modify,prop.objects[nestedPropIndex].properties,nestedPropKey);}else if(prop.properties){modifyProperty(modify,prop.properties[nestedPropIndex],nestedPropKey);}}});});}

/***/ }),

/***/ "../../tools/piw-utils/dist/utils/index.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/piw-utils/dist/utils/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _PageEditorUtils=__webpack_require__(/*! ./PageEditorUtils */ "../../tools/piw-utils/dist/utils/PageEditorUtils.js");Object.keys(_PageEditorUtils).forEach(function(key){if(key==="default"||key==="__esModule")return;Object.defineProperty(exports,key,{enumerable:true,get:function get(){return _PageEditorUtils[key];}});});

/***/ }),

/***/ "../../tools/pluggable-widgets-tools/src/native/styles.ts":
/*!************************************************************************************************************************************!*\
  !*** /Users/Wesley/Documents/development/work/repos/widgets-resources/packages/tools/pluggable-widgets-tools/src/native/styles.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: flattenStyles, extractStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenStyles", function() { return flattenStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractStyles", function() { return extractStyles; });
function flattenStyles(defaultStyle, overrideStyles) {
    const styles = [defaultStyle, ...overrideStyles.filter((object) => object !== undefined)];
    return Object.keys(defaultStyle).reduce((flattened, currentKey) => {
        const styleItems = styles.map(object => object[currentKey]);
        return {
            ...flattened,
            [currentKey]: flattenObjects(styleItems)
        };
    }, {});
}
function flattenObjects(objects) {
    return objects.reduce((merged, object) => ({ ...merged, ...object }), {});
}
function extractStyles(source, extractionKeys) {
    if (!source) {
        return [{}, {}];
    }
    return Object.entries(source).reduce(([extracted, rest], [key, value]) => {
        if (extractionKeys.includes(key)) {
            extracted[key] = value;
        }
        else {
            rest[key] = value;
        }
        return [extracted, rest];
    }, [{}, {}]);
}


/***/ }),

/***/ "./components/Touchable.tsx":
/*!**********************************!*\
  !*** ./components/Touchable.tsx ***!
  \**********************************/
/*! exports provided: Touchable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Touchable", function() { return Touchable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../tools/pluggable-widgets-tools/src/native/styles */ "../../tools/pluggable-widgets-tools/src/native/styles.ts");



const DEFAULT_RIPPLE_COLOR = "rgba(0, 0, 0, 0.2)";
const isAndroid = react_native__WEBPACK_IMPORTED_MODULE_1__["Platform"].OS === "android";
const Touchable = props => {
    var _a;
    if (isAndroid) {
        return (Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableNativeFeedback"], Object.assign({}, props, { useForeground: react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableNativeFeedback"].canUseNativeForeground(), background: react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableNativeFeedback"].Ripple((_a = props.rippleColor) !== null && _a !== void 0 ? _a : DEFAULT_RIPPLE_COLOR, !!props.borderless) }),
            Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], { style: { ...props.style, overflow: "hidden" } }, props.children)));
    }
    else {
        const [childStyle, style] = Object(_tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_2__["extractStyles"])(props.style, [
            "alignContent",
            "alignItems",
            "direction",
            "flexDirection",
            "flexWrap",
            "justifyContent",
            "padding",
            "paddingVertical",
            "paddingHorizontal",
            "paddingTop",
            "paddingBottom",
            "paddingLeft",
            "paddingRight",
            "paddingStart",
            "paddingEnd"
        ]);
        if (props.underlayColor) {
            return (Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableHighlight"], Object.assign({}, props, { style: style, underlayColor: props.underlayColor, activeOpacity: props.activeOpacity }),
                Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], { style: { flexGrow: 0, flexShrink: 0, ...childStyle } }, props.children)));
        }
        return (Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableOpacity"], Object.assign({}, props, { style: style }),
            Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], { style: { flexGrow: 0, flexShrink: 0, ...childStyle } }, props.children)));
    }
};



/***/ }),

/***/ "./node_modules/react-native-signature-canvas/h5/html.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-native-signature-canvas/h5/html.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var content=function content(script){return"<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Signature Pad demo</title>\n  <meta name=\"description\" content=\"Signature Pad - HTML5 canvas based smooth signature drawing using variable width spline interpolation.\">\n\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no\">\n\n  <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n  <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n\n  <style>\n    body {\n      background: url(\"data:image/png;base64,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\") repeat scroll center center rgb(179, 179, 179);\n      font-family: Helvetica, Sans-Serif;\n    \n      -moz-user-select: none;\n      -webkit-user-select: none;\n      -ms-user-select: none;\n    }\n    \n    .m-signature-pad {\n      position: absolute;\n      font-size: 10px;\n      width: 700px;\n      height: 400px;\n      top: 50%;\n      left: 50%;\n      margin-left: -350px;\n      margin-top: -200px;\n      border: 1px solid #e8e8e8;\n      background-color: #fff;\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;\n    }\n    \n    .m-signature-pad:before, .m-signature-pad:after {\n      position: absolute;\n      z-index: -1;\n      content: \"\";\n      width: 40%;\n      height: 10px;\n      left: 20px;\n      bottom: 10px;\n      background: transparent;\n      -webkit-transform: skew(-3deg) rotate(-3deg);\n      -moz-transform: skew(-3deg) rotate(-3deg);\n      -ms-transform: skew(-3deg) rotate(-3deg);\n      -o-transform: skew(-3deg) rotate(-3deg);\n      transform: skew(-3deg) rotate(-3deg);\n      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);\n    }\n    \n    .m-signature-pad:after {\n      left: auto;\n      right: 20px;\n      -webkit-transform: skew(3deg) rotate(3deg);\n      -moz-transform: skew(3deg) rotate(3deg);\n      -ms-transform: skew(3deg) rotate(3deg);\n      -o-transform: skew(3deg) rotate(3deg);\n      transform: skew(3deg) rotate(3deg);\n    }\n    \n    .m-signature-pad--body {\n      position: absolute;\n      left: 20px;\n      right: 20px;\n      top: 20px;\n      bottom: 60px;\n      border: 1px solid #f4f4f4;\n    }\n    \n    .m-signature-pad--body\n      canvas {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        border-radius: 4px;\n        box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;\n      }\n    \n    .m-signature-pad--footer {\n      position: absolute;\n      left: 20px;\n      right: 20px;\n      bottom: 20px;\n      height: 40px;\n    }\n    \n    .m-signature-pad--footer\n      .description {\n        color: #C3C3C3;\n        text-align: center;\n        font-size: 1.2em;\n        margin-top: 1.8em;\n      }\n    \n    .m-signature-pad--footer\n      .button {\n        position: absolute;\n        bottom: 0;\n        background-color: #3F99F7;\n        height: 32px;\n        padding: 0 20px;\n        line-height: 32px;\n        text-align: center;\n        color: #FFF;\n        border: 1px solid transparent;\n        border-radius: 4px;\n        outline: none;\n        box-shadow: none;\n      }\n    \n    .m-signature-pad--footer\n      .button.clear {\n        left: 0;\n      }\n    \n    .m-signature-pad--footer\n      .button.save {\n        right: 0;\n      }\n    \n    @media screen and (max-width: 1024px) {\n      .m-signature-pad {\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        width: auto;\n        height: auto;\n        min-width: 250px;\n        min-height: 140px;\n        margin: 0;\n      }\n      #github {\n        display: none;\n      }\n    }\n    \n    @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {\n      .m-signature-pad {\n        margin: 10%;\n      }\n    }\n    \n    @media screen and (max-height: 320px) {\n      .m-signature-pad--body {\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 32px;\n      }\n      .m-signature-pad--footer {\n        left: 20px;\n        right: 20px;\n        bottom: 4px;\n        height: 28px;\n      }\n      .m-signature-pad--footer\n        .description {\n          font-size: 1em;\n          margin-top: 1em;\n        }\n    }\n    <%style%>\n    </style>\n</head>\n<body onselectstart=\"return false\">\n  <div id=\"signature-pad\" class=\"m-signature-pad\">\n    <div class=\"m-signature-pad--body\">\n      <canvas></canvas>\n    </div>\n    <div class=\"m-signature-pad--footer\">\n      <div class=\"description\"><%description%></div>\n      <button type=\"button\" class=\"button clear\" data-action=\"clear\"><%clear%></button>\n      <button type=\"button\" class=\"button save\" data-action=\"save\"><%confirm%></button>\n    </div>\n  </div>\n\n  <script>\n    "+script+"\n  </script>\n</body>\n</html>";};var _default=content;exports.default=_default;

/***/ }),

/***/ "./node_modules/react-native-signature-canvas/h5/js/app.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-native-signature-canvas/h5/js/app.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var content="\n    var wrapper = document.getElementById(\"signature-pad\"),\n        clearButton = wrapper.querySelector(\"[data-action=clear]\"),\n        saveButton = wrapper.querySelector(\"[data-action=save]\"),\n        canvas = wrapper.querySelector(\"canvas\"),\n        signaturePad;\n    \n    // Adjust canvas coordinate space taking into account pixel ratio,\n    // to make it look crisp on mobile devices.\n    // This also causes canvas to be cleared.\n    function resizeCanvas() {\n        // When zoomed out to less than 100%, for some very strange reason,\n        // some browsers report devicePixelRatio as less than 1\n        // and only part of the canvas is cleared then.\n        var context = canvas.getContext(\"2d\"); //context.getImageData(0,0,canvas.width,canvas.height)\n        var imgData = signaturePad ? signaturePad.toData() : null;\n        var ratio =  Math.max(window.devicePixelRatio || 1, 1);\n        canvas.width = canvas.offsetWidth * ratio;\n        canvas.height = canvas.offsetHeight * ratio;\n        context.scale(ratio, ratio);\n        // context.putImageData(imgData,0,0);\n        imgData && signaturePad.fromData(imgData);\n    }\n    \n    window.onresize = resizeCanvas;\n    resizeCanvas();\n    \n    signaturePad = new SignaturePad(canvas, {\n        onBegin: () => window.ReactNativeWebView.postMessage(\"BEGIN\"),\n        onEnd: () => window.ReactNativeWebView.postMessage(\"END\"),\n        penColor: '<%penColor%>',\n        backgroundColor: '<%backgroundColor%>',\n    });\n\n    function clearSignature (event) {\n        signaturePad.clear();\n        window.ReactNativeWebView.postMessage(\"CLEAR\");\n    }\n\n    clearButton.addEventListener(\"click\", clearSignature );\n\n    var autoClear = <%autoClear%>;\n\n    var dataURL = '<%dataURL%>';\n\n    if (dataURL) {\n        signaturePad.fromDataURL(dataURL);\n    }\n\n    function readSignature()  {\n        if (signaturePad.isEmpty()) {\n            window.ReactNativeWebView.postMessage(\"EMPTY\");\n        } else {\n            var url = signaturePad.toDataURL('<%imageType%>');\n            window.ReactNativeWebView.postMessage(url);\n            if (autoClear) {\n                signaturePad.clear();\n            }\n        }\n    }\n    \n    saveButton.addEventListener(\"click\", readSignature);\n";var _default=content;exports.default=_default;

/***/ }),

/***/ "./node_modules/react-native-signature-canvas/h5/js/signature_pad.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-native-signature-canvas/h5/js/signature_pad.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var content="\n/*!\n * Signature Pad v3.0.0-beta.3 | https://github.com/szimek/signature_pad\n * (c) 2018 Szymon Nowak | Released under the MIT license\n */\n\n(function (global, factory) {\n  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :\n  typeof define === 'function' && define.amd ? define(factory) :\n  (global.SignaturePad = factory());\n}(this, (function () { 'use strict';\n\n  var Point = (function () {\n      function Point(x, y, time) {\n          this.x = x;\n          this.y = y;\n          this.time = time || Date.now();\n      }\n      Point.prototype.distanceTo = function (start) {\n          return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));\n      };\n      Point.prototype.equals = function (other) {\n          return this.x === other.x && this.y === other.y && this.time === other.time;\n      };\n      Point.prototype.velocityFrom = function (start) {\n          return this.time !== start.time\n              ? this.distanceTo(start) / (this.time - start.time)\n              : 0;\n      };\n      return Point;\n  }());\n\n  var Bezier = (function () {\n      function Bezier(startPoint, control2, control1, endPoint, startWidth, endWidth) {\n          this.startPoint = startPoint;\n          this.control2 = control2;\n          this.control1 = control1;\n          this.endPoint = endPoint;\n          this.startWidth = startWidth;\n          this.endWidth = endWidth;\n      }\n      Bezier.fromPoints = function (points, widths) {\n          var c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;\n          var c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;\n          return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);\n      };\n      Bezier.calculateControlPoints = function (s1, s2, s3) {\n          var dx1 = s1.x - s2.x;\n          var dy1 = s1.y - s2.y;\n          var dx2 = s2.x - s3.x;\n          var dy2 = s2.y - s3.y;\n          var m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };\n          var m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };\n          var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);\n          var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);\n          var dxm = m1.x - m2.x;\n          var dym = m1.y - m2.y;\n          var k = l2 / (l1 + l2);\n          var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };\n          var tx = s2.x - cm.x;\n          var ty = s2.y - cm.y;\n          return {\n              c1: new Point(m1.x + tx, m1.y + ty),\n              c2: new Point(m2.x + tx, m2.y + ty)\n          };\n      };\n      Bezier.prototype.length = function () {\n          var steps = 10;\n          var length = 0;\n          var px;\n          var py;\n          for (var i = 0; i <= steps; i += 1) {\n              var t = i / steps;\n              var cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);\n              var cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);\n              if (i > 0) {\n                  var xdiff = cx - px;\n                  var ydiff = cy - py;\n                  length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);\n              }\n              px = cx;\n              py = cy;\n          }\n          return length;\n      };\n      Bezier.prototype.point = function (t, start, c1, c2, end) {\n          return (start * (1.0 - t) * (1.0 - t) * (1.0 - t))\n              + (3.0 * c1 * (1.0 - t) * (1.0 - t) * t)\n              + (3.0 * c2 * (1.0 - t) * t * t)\n              + (end * t * t * t);\n      };\n      return Bezier;\n  }());\n\n  function throttle(fn, wait) {\n      if (wait === void 0) { wait = 250; }\n      var previous = 0;\n      var timeout = null;\n      var result;\n      var storedContext;\n      var storedArgs;\n      var later = function () {\n          previous = Date.now();\n          timeout = null;\n          result = fn.apply(storedContext, storedArgs);\n          if (!timeout) {\n              storedContext = null;\n              storedArgs = [];\n          }\n      };\n      return function wrapper() {\n          var args = [];\n          for (var _i = 0; _i < arguments.length; _i++) {\n              args[_i] = arguments[_i];\n          }\n          var now = Date.now();\n          var remaining = wait - (now - previous);\n          storedContext = this;\n          storedArgs = args;\n          if (remaining <= 0 || remaining > wait) {\n              if (timeout) {\n                  clearTimeout(timeout);\n                  timeout = null;\n              }\n              previous = now;\n              result = fn.apply(storedContext, storedArgs);\n              if (!timeout) {\n                  storedContext = null;\n                  storedArgs = [];\n              }\n          }\n          else if (!timeout) {\n              timeout = window.setTimeout(later, remaining);\n          }\n          return result;\n      };\n  }\n\n  var SignaturePad = (function () {\n      function SignaturePad(canvas, options) {\n          if (options === void 0) { options = {}; }\n          var _this = this;\n          this.canvas = canvas;\n          this.options = options;\n          this._handleMouseDown = function (event) {\n              if (event.which === 1) {\n                  _this._mouseButtonDown = true;\n                  _this._strokeBegin(event);\n              }\n          };\n          this._handleMouseMove = function (event) {\n              if (_this._mouseButtonDown) {\n                  _this._strokeMoveUpdate(event);\n              }\n          };\n          this._handleMouseUp = function (event) {\n              if (event.which === 1 && _this._mouseButtonDown) {\n                  _this._mouseButtonDown = false;\n                  _this._strokeEnd(event);\n              }\n          };\n          this._handleTouchStart = function (event) {\n              event.preventDefault();\n              if (event.targetTouches.length === 1) {\n                  var touch = event.changedTouches[0];\n                  _this._strokeBegin(touch);\n              }\n          };\n          this._handleTouchMove = function (event) {\n              event.preventDefault();\n              var touch = event.targetTouches[0];\n              _this._strokeMoveUpdate(touch);\n          };\n          this._handleTouchEnd = function (event) {\n              var wasCanvasTouched = event.target === _this.canvas;\n              if (wasCanvasTouched) {\n                  event.preventDefault();\n                  var touch = event.changedTouches[0];\n                  _this._strokeEnd(touch);\n              }\n          };\n          this.velocityFilterWeight = options.velocityFilterWeight || 0.7;\n          this.minWidth = options.minWidth || 0.5;\n          this.maxWidth = options.maxWidth || 2.5;\n          this.throttle = ('throttle' in options ? options.throttle : 16);\n          this.minDistance = ('minDistance' in options\n              ? options.minDistance\n              : 5);\n          if (this.throttle) {\n              this._strokeMoveUpdate = throttle(SignaturePad.prototype._strokeUpdate, this.throttle);\n          }\n          else {\n              this._strokeMoveUpdate = SignaturePad.prototype._strokeUpdate;\n          }\n          this.dotSize =\n              options.dotSize ||\n                  function dotSize() {\n                      return (this.minWidth + this.maxWidth) / 2;\n                  };\n          this.penColor = options.penColor || 'black';\n          this.backgroundColor = options.backgroundColor || 'rgba(0,0,0,0)';\n          this.onBegin = options.onBegin;\n          this.onEnd = options.onEnd;\n          this._ctx = canvas.getContext('2d');\n          this.clear();\n          this.on();\n      }\n      SignaturePad.prototype.clear = function () {\n          var ctx = this._ctx;\n          var canvas = this.canvas;\n          ctx.fillStyle = this.backgroundColor;\n          ctx.clearRect(0, 0, canvas.width, canvas.height);\n          ctx.fillRect(0, 0, canvas.width, canvas.height);\n          this._data = [];\n          this._reset();\n          this._isEmpty = true;\n      };\n      SignaturePad.prototype.fromDataURL = function (dataUrl, options, callback) {\n          var _this = this;\n          if (options === void 0) { options = {}; }\n          var image = new Image();\n          var ratio = options.ratio || window.devicePixelRatio || 1;\n          var width = options.width || this.canvas.width / ratio;\n          var height = options.height || this.canvas.height / ratio;\n          this._reset();\n          image.onload = function () {\n              _this._ctx.drawImage(image, 0, 0, width, height);\n              if (callback) {\n                  callback();\n              }\n          };\n          image.onerror = function (error) {\n              if (callback) {\n                  callback(error);\n              }\n          };\n          image.src = dataUrl;\n          this._isEmpty = false;\n      };\n      SignaturePad.prototype.toDataURL = function (type, encoderOptions) {\n          if (type === void 0) { type = 'image/png'; }\n          switch (type) {\n              case 'image/svg+xml':\n                  return this._toSVG();\n              default:\n                  return this.canvas.toDataURL(type, encoderOptions);\n          }\n      };\n      SignaturePad.prototype.on = function () {\n          this.canvas.style.touchAction = 'none';\n          this.canvas.style.msTouchAction = 'none';\n          if (window.PointerEvent) {\n              this._handlePointerEvents();\n          }\n          else {\n              this._handleMouseEvents();\n              if ('ontouchstart' in window) {\n                  this._handleTouchEvents();\n              }\n          }\n      };\n      SignaturePad.prototype.off = function () {\n          this.canvas.style.touchAction = 'auto';\n          this.canvas.style.msTouchAction = 'auto';\n          this.canvas.removeEventListener('pointerdown', this._handleMouseDown);\n          this.canvas.removeEventListener('pointermove', this._handleMouseMove);\n          document.removeEventListener('pointerup', this._handleMouseUp);\n          this.canvas.removeEventListener('mousedown', this._handleMouseDown);\n          this.canvas.removeEventListener('mousemove', this._handleMouseMove);\n          document.removeEventListener('mouseup', this._handleMouseUp);\n          this.canvas.removeEventListener('touchstart', this._handleTouchStart);\n          this.canvas.removeEventListener('touchmove', this._handleTouchMove);\n          this.canvas.removeEventListener('touchend', this._handleTouchEnd);\n      };\n      SignaturePad.prototype.isEmpty = function () {\n          return this._isEmpty;\n      };\n      SignaturePad.prototype.fromData = function (pointGroups) {\n          var _this = this;\n          this.clear();\n          this._fromData(pointGroups, function (_a) {\n              var color = _a.color, curve = _a.curve;\n              return _this._drawCurve({ color: color, curve: curve });\n          }, function (_a) {\n              var color = _a.color, point = _a.point;\n              return _this._drawDot({ color: color, point: point });\n          });\n          this._data = pointGroups;\n      };\n      SignaturePad.prototype.toData = function () {\n          return this._data;\n      };\n      SignaturePad.prototype._strokeBegin = function (event) {\n          var newPointGroup = {\n              color: this.penColor,\n              points: []\n          };\n          if (typeof this.onBegin === 'function') {\n              this.onBegin(event);\n          }\n          this._data.push(newPointGroup);\n          this._reset();\n          this._strokeUpdate(event);\n      };\n      SignaturePad.prototype._strokeUpdate = function (event) {\n          var x = event.clientX;\n          var y = event.clientY;\n          var point = this._createPoint(x, y);\n          var lastPointGroup = this._data[this._data.length - 1];\n          var lastPoints = lastPointGroup.points;\n          var lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];\n          var isLastPointTooClose = lastPoint\n              ? point.distanceTo(lastPoint) <= this.minDistance\n              : false;\n          var color = lastPointGroup.color;\n          if (!lastPoint || !(lastPoint && isLastPointTooClose)) {\n              var curve = this._addPoint(point);\n              if (!lastPoint) {\n                  this._drawDot({ color: color, point: point });\n              }\n              else if (curve) {\n                  this._drawCurve({ color: color, curve: curve });\n              }\n              lastPoints.push({\n                  time: point.time,\n                  x: point.x,\n                  y: point.y\n              });\n          }\n      };\n      SignaturePad.prototype._strokeEnd = function (event) {\n          this._strokeUpdate(event);\n          if (typeof this.onEnd === 'function') {\n              this.onEnd(event);\n          }\n      };\n      SignaturePad.prototype._handlePointerEvents = function () {\n          this._mouseButtonDown = false;\n          this.canvas.addEventListener('pointerdown', this._handleMouseDown);\n          this.canvas.addEventListener('pointermove', this._handleMouseMove);\n          document.addEventListener('pointerup', this._handleMouseUp);\n      };\n      SignaturePad.prototype._handleMouseEvents = function () {\n          this._mouseButtonDown = false;\n          this.canvas.addEventListener('mousedown', this._handleMouseDown);\n          this.canvas.addEventListener('mousemove', this._handleMouseMove);\n          document.addEventListener('mouseup', this._handleMouseUp);\n      };\n      SignaturePad.prototype._handleTouchEvents = function () {\n          this.canvas.addEventListener('touchstart', this._handleTouchStart);\n          this.canvas.addEventListener('touchmove', this._handleTouchMove);\n          this.canvas.addEventListener('touchend', this._handleTouchEnd);\n      };\n      SignaturePad.prototype._reset = function () {\n          this._lastPoints = [];\n          this._lastVelocity = 0;\n          this._lastWidth = (this.minWidth + this.maxWidth) / 2;\n          this._ctx.fillStyle = this.penColor;\n      };\n      SignaturePad.prototype._createPoint = function (x, y) {\n          var rect = this.canvas.getBoundingClientRect();\n          return new Point(x - rect.left, y - rect.top, new Date().getTime());\n      };\n      SignaturePad.prototype._addPoint = function (point) {\n          var _lastPoints = this._lastPoints;\n          _lastPoints.push(point);\n          if (_lastPoints.length > 2) {\n              if (_lastPoints.length === 3) {\n                  _lastPoints.unshift(_lastPoints[0]);\n              }\n              var widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2]);\n              var curve = Bezier.fromPoints(_lastPoints, widths);\n              _lastPoints.shift();\n              return curve;\n          }\n          return null;\n      };\n      SignaturePad.prototype._calculateCurveWidths = function (startPoint, endPoint) {\n          var velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) +\n              (1 - this.velocityFilterWeight) * this._lastVelocity;\n          var newWidth = this._strokeWidth(velocity);\n          var widths = {\n              end: newWidth,\n              start: this._lastWidth\n          };\n          this._lastVelocity = velocity;\n          this._lastWidth = newWidth;\n          return widths;\n      };\n      SignaturePad.prototype._strokeWidth = function (velocity) {\n          return Math.max(this.maxWidth / (velocity + 1), this.minWidth);\n      };\n      SignaturePad.prototype._drawCurveSegment = function (x, y, width) {\n          var ctx = this._ctx;\n          ctx.moveTo(x, y);\n          ctx.arc(x, y, width, 0, 2 * Math.PI, false);\n          this._isEmpty = false;\n      };\n      SignaturePad.prototype._drawCurve = function (_a) {\n          var color = _a.color, curve = _a.curve;\n          var ctx = this._ctx;\n          var widthDelta = curve.endWidth - curve.startWidth;\n          var drawSteps = Math.floor(curve.length()) * 2;\n          ctx.beginPath();\n          ctx.fillStyle = color;\n          for (var i = 0; i < drawSteps; i += 1) {\n              var t = i / drawSteps;\n              var tt = t * t;\n              var ttt = tt * t;\n              var u = 1 - t;\n              var uu = u * u;\n              var uuu = uu * u;\n              var x = uuu * curve.startPoint.x;\n              x += 3 * uu * t * curve.control1.x;\n              x += 3 * u * tt * curve.control2.x;\n              x += ttt * curve.endPoint.x;\n              var y = uuu * curve.startPoint.y;\n              y += 3 * uu * t * curve.control1.y;\n              y += 3 * u * tt * curve.control2.y;\n              y += ttt * curve.endPoint.y;\n              var width = curve.startWidth + ttt * widthDelta;\n              this._drawCurveSegment(x, y, width);\n          }\n          ctx.closePath();\n          ctx.fill();\n      };\n      SignaturePad.prototype._drawDot = function (_a) {\n          var color = _a.color, point = _a.point;\n          var ctx = this._ctx;\n          var width = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;\n          ctx.beginPath();\n          this._drawCurveSegment(point.x, point.y, width);\n          ctx.closePath();\n          ctx.fillStyle = color;\n          ctx.fill();\n      };\n      SignaturePad.prototype._fromData = function (pointGroups, drawCurve, drawDot) {\n          for (var _i = 0, pointGroups_1 = pointGroups; _i < pointGroups_1.length; _i++) {\n              var group = pointGroups_1[_i];\n              var color = group.color, points = group.points;\n              if (points.length > 1) {\n                  for (var j = 0; j < points.length; j += 1) {\n                      var basicPoint = points[j];\n                      var point = new Point(basicPoint.x, basicPoint.y, basicPoint.time);\n                      this.penColor = color;\n                      if (j === 0) {\n                          this._reset();\n                      }\n                      var curve = this._addPoint(point);\n                      if (curve) {\n                          drawCurve({ color: color, curve: curve });\n                      }\n                  }\n              }\n              else {\n                  this._reset();\n                  drawDot({\n                      color: color,\n                      point: points[0]\n                  });\n              }\n          }\n      };\n      SignaturePad.prototype._toSVG = function () {\n          var _this = this;\n          var pointGroups = this._data;\n          var ratio = Math.max(window.devicePixelRatio || 1, 1);\n          var minX = 0;\n          var minY = 0;\n          var maxX = this.canvas.width / ratio;\n          var maxY = this.canvas.height / ratio;\n          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n          svg.setAttribute('width', this.canvas.width.toString());\n          svg.setAttribute('height', this.canvas.height.toString());\n          this._fromData(pointGroups, function (_a) {\n              var color = _a.color, curve = _a.curve;\n              var path = document.createElement('path');\n              if (!isNaN(curve.control1.x) &&\n                  !isNaN(curve.control1.y) &&\n                  !isNaN(curve.control2.x) &&\n                  !isNaN(curve.control2.y)) {\n                  var attr = \"M \" + curve.startPoint.x.toFixed(3) + \",\" + curve.startPoint.y.toFixed(3) + \" \" +\n                      (\"C \" + curve.control1.x.toFixed(3) + \",\" + curve.control1.y.toFixed(3) + \" \") +\n                      (curve.control2.x.toFixed(3) + \",\" + curve.control2.y.toFixed(3) + \" \") +\n                      (curve.endPoint.x.toFixed(3) + \",\" + curve.endPoint.y.toFixed(3));\n                  path.setAttribute('d', attr);\n                  path.setAttribute('stroke-width', (curve.endWidth * 2.25).toFixed(3));\n                  path.setAttribute('stroke', color);\n                  path.setAttribute('fill', 'none');\n                  path.setAttribute('stroke-linecap', 'round');\n                  svg.appendChild(path);\n              }\n          }, function (_a) {\n              var color = _a.color, point = _a.point;\n              var circle = document.createElement('circle');\n              var dotSize = typeof _this.dotSize === 'function' ? _this.dotSize() : _this.dotSize;\n              circle.setAttribute('r', dotSize.toString());\n              circle.setAttribute('cx', point.x.toString());\n              circle.setAttribute('cy', point.y.toString());\n              circle.setAttribute('fill', color);\n              svg.appendChild(circle);\n          });\n          var prefix = 'data:image/svg+xml;base64,';\n          var header = '<svg' +\n              ' xmlns=\"http://www.w3.org/2000/svg\"' +\n              ' xmlns:xlink=\"http://www.w3.org/1999/xlink\"' +\n              (\" viewBox=\\\"\" + minX + \" \" + minY + \" \" + maxX + \" \" + maxY + \"\\\"\") +\n              (\" width=\\\"\" + maxX + \"\\\"\") +\n              (\" height=\\\"\" + maxY + \"\\\"\") +\n              '>';\n          var body = svg.innerHTML;\n          if (body === undefined) {\n              var dummy = document.createElement('dummy');\n              var nodes = svg.childNodes;\n              dummy.innerHTML = '';\n              for (var i = 0; i < nodes.length; i += 1) {\n                  dummy.appendChild(nodes[i].cloneNode(true));\n              }\n              body = dummy.innerHTML;\n          }\n          var footer = '</svg>';\n          var data = header + body + footer;\n          return prefix + btoa(data);\n      };\n      return SignaturePad;\n  }());\n\n  return SignaturePad;\n\n})));\n";var _default=content;exports.default=_default;

/***/ }),

/***/ "./node_modules/react-native-signature-canvas/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-native-signature-canvas/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");var _interopRequireWildcard=__webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../../../node_modules/@babel/runtime/helpers/interopRequireWildcard.js");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _slicedToArray2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../../node_modules/@babel/runtime/helpers/slicedToArray.js"));var _react=_interopRequireWildcard(__webpack_require__(/*! react */ "react"));var _reactNative=__webpack_require__(/*! react-native */ "react-native");var _html=_interopRequireDefault(__webpack_require__(/*! ./h5/html */ "./node_modules/react-native-signature-canvas/h5/html.js"));var _signature_pad=_interopRequireDefault(__webpack_require__(/*! ./h5/js/signature_pad */ "./node_modules/react-native-signature-canvas/h5/js/signature_pad.js"));var _app=_interopRequireDefault(__webpack_require__(/*! ./h5/js/app */ "./node_modules/react-native-signature-canvas/h5/js/app.js"));var _reactNativeWebview=__webpack_require__(/*! react-native-webview */ "react-native-webview");var _this=this,_jsxFileName="/Users/Wesley/Documents/development/work/repos/widgets-resources/packages/pluggableWidgets/signature-native/node_modules/react-native-signature-canvas/index.js";var styles=_reactNative.StyleSheet.create({webBg:{width:"100%",backgroundColor:"#FFF",flex:1},loadingOverlayContainer:{position:"absolute",top:0,bottom:0,left:0,right:0,alignItems:"center",justifyContent:"center"}});var SignatureView=(0,_react.forwardRef)(function(_ref,ref){var _ref$webStyle=_ref.webStyle,webStyle=_ref$webStyle===void 0?"":_ref$webStyle,_ref$onOK=_ref.onOK,onOK=_ref$onOK===void 0?function(){}:_ref$onOK,_ref$onEmpty=_ref.onEmpty,onEmpty=_ref$onEmpty===void 0?function(){}:_ref$onEmpty,_ref$onClear=_ref.onClear,onClear=_ref$onClear===void 0?function(){}:_ref$onClear,_ref$onBegin=_ref.onBegin,onBegin=_ref$onBegin===void 0?function(){}:_ref$onBegin,_ref$onEnd=_ref.onEnd,onEnd=_ref$onEnd===void 0?function(){}:_ref$onEnd,_ref$descriptionText=_ref.descriptionText,descriptionText=_ref$descriptionText===void 0?"Sign above":_ref$descriptionText,_ref$clearText=_ref.clearText,clearText=_ref$clearText===void 0?"Clear":_ref$clearText,_ref$confirmText=_ref.confirmText,confirmText=_ref$confirmText===void 0?"Confirm":_ref$confirmText,_ref$customHtml=_ref.customHtml,customHtml=_ref$customHtml===void 0?null:_ref$customHtml,_ref$autoClear=_ref.autoClear,autoClear=_ref$autoClear===void 0?false:_ref$autoClear,_ref$imageType=_ref.imageType,imageType=_ref$imageType===void 0?"":_ref$imageType,_ref$dataURL=_ref.dataURL,dataURL=_ref$dataURL===void 0?"":_ref$dataURL,_ref$penColor=_ref.penColor,penColor=_ref$penColor===void 0?"":_ref$penColor,_ref$backgroundColor=_ref.backgroundColor,backgroundColor=_ref$backgroundColor===void 0?"":_ref$backgroundColor;var _useState=(0,_react.useState)(true),_useState2=(0,_slicedToArray2.default)(_useState,2),loading=_useState2[0],setLoading=_useState2[1];var webViewRef=(0,_react.useRef)();var source=(0,_react.useMemo)(function(){var injectedJavaScript=_signature_pad.default+_app.default;var htmlContentValue=customHtml?customHtml:_html.default;injectedJavaScript=injectedJavaScript.replace("<%autoClear%>",autoClear);injectedJavaScript=injectedJavaScript.replace("<%imageType%>",imageType);injectedJavaScript=injectedJavaScript.replace("<%dataURL%>",dataURL);injectedJavaScript=injectedJavaScript.replace("<%penColor%>",penColor);injectedJavaScript=injectedJavaScript.replace("<%backgroundColor%>",backgroundColor);var html=htmlContentValue(injectedJavaScript);html=html.replace("<%style%>",webStyle);html=html.replace("<%description%>",descriptionText);html=html.replace("<%confirm%>",confirmText);html=html.replace("<%clear%>",clearText);return{html:html};},[customHtml,autoClear,imageType,webStyle,descriptionText,confirmText,clearText]);var getSignature=function getSignature(e){switch(e.nativeEvent.data){case"BEGIN":onBegin();break;case"END":onEnd();break;case"EMPTY":onEmpty();break;case"CLEAR":onClear();break;default:onOK(e.nativeEvent.data);}};(0,_react.useImperativeHandle)(ref,function(){return{readSignature:function readSignature(){if(webViewRef.current){webViewRef.current.injectJavaScript("readSignature();true;");}},clearSignature:function clearSignature(){if(webViewRef.current){webViewRef.current.injectJavaScript("clearSignature();true;");}}};},[webViewRef]);var renderError=function renderError(e){var nativeEvent=e.nativeEvent;console.warn("WebView error: ",nativeEvent);};return _react.default.createElement(_reactNative.View,{style:styles.webBg,__self:_this,__source:{fileName:_jsxFileName,lineNumber:94,columnNumber:5}},_react.default.createElement(_reactNativeWebview.WebView,{ref:webViewRef,useWebKit:true,source:source,onMessage:getSignature,javaScriptEnabled:true,onError:renderError,onLoadEnd:function onLoadEnd(){return setLoading(false);},__self:_this,__source:{fileName:_jsxFileName,lineNumber:95,columnNumber:7}}),loading&&_react.default.createElement(_reactNative.View,{style:styles.loadingOverlayContainer,__self:_this,__source:{fileName:_jsxFileName,lineNumber:104,columnNumber:19}},_react.default.createElement(_reactNative.ActivityIndicator,{__self:_this,__source:{fileName:_jsxFileName,lineNumber:105,columnNumber:9}})));});var _default=SignatureView;exports.default=_default;

/***/ }),

/***/ "./src/Signature.tsx":
/*!***************************!*\
  !*** ./src/Signature.tsx ***!
  \***************************/
/*! exports provided: Signature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signature", function() { return Signature; });
/* harmony import */ var _tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../tools/pluggable-widgets-tools/src/native/styles */ "../../tools/pluggable-widgets-tools/src/native/styles.ts");
/* harmony import */ var _widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @widgets-resources/piw-utils */ "../../tools/piw-utils/dist/index.js");
/* harmony import */ var _widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_native_signature_canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-native-signature-canvas */ "./node_modules/react-native-signature-canvas/index.js");
/* harmony import */ var react_native_signature_canvas__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_native_signature_canvas__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Touchable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Touchable */ "./components/Touchable.tsx");
/* harmony import */ var _ui_Styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/Styles */ "./src/ui/Styles.ts");







function Signature(props) {
    var _a, _b, _c, _d;
    const ref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
    const styles = Object(_tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_0__["flattenStyles"])(_ui_Styles__WEBPACK_IMPORTED_MODULE_6__["defaultSignatureStyle"], props.style);
    const [signatureProps, containerStyles] = Object(_tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_0__["extractStyles"])(styles.container, ["penColor", "backgroundColor"]);
    const [buttonClearContainerProps, buttonClearContainerStyles] = Object(_tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_0__["extractStyles"])(styles.buttonClearContainer, [
        "rippleColor",
        "activeOpacity",
        "underlayColor"
    ]);
    const [buttonSaveContainerProps, buttonSaveContainerStyles] = Object(_tools_pluggable_widgets_tools_src_native_styles__WEBPACK_IMPORTED_MODULE_0__["extractStyles"])(styles.buttonSaveContainer, [
        "rippleColor",
        "activeOpacity",
        "underlayColor"
    ]);
    const buttonCaptionClear = (_b = (_a = props.buttonCaptionClear) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "Clear";
    const buttonCaptionSave = (_d = (_c = props.buttonCaptionSave) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "Save";
    const buttonCaptionClearTestID = buttonCaptionClear.replace(/ /g, "");
    const buttonCaptionSaveTestID = buttonCaptionSave.replace(/ /g, "");
    const handleSignature = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])((base64signature) => {
        props.imageAttribute.setValue(base64signature);
        Object(_widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1__["executeAction"])(props.onSave);
    }, [props.imageAttribute, props.onSave]);
    return (Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_3__["View"], { style: [{ flex: 1 }, containerStyles] },
        Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(react_native_signature_canvas__WEBPACK_IMPORTED_MODULE_4___default.a, Object.assign({ ref: ref, autoClear: true, onEmpty: () => Object(_widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1__["executeAction"])(props.onEmpty), onEnd: () => Object(_widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1__["executeAction"])(props.onEnd), onOK: handleSignature, onClear: () => Object(_widgets_resources_piw_utils__WEBPACK_IMPORTED_MODULE_1__["executeAction"])(props.onClear), webStyle: _ui_Styles__WEBPACK_IMPORTED_MODULE_6__["webStyles"] }, signatureProps)),
        Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_3__["View"], { style: styles.buttonWrapper },
            Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_components_Touchable__WEBPACK_IMPORTED_MODULE_5__["Touchable"], Object.assign({ testID: `${buttonCaptionClearTestID}$Touchable`, onPress: () => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.clearSignature(); }, accessible: false, style: buttonClearContainerStyles }, buttonClearContainerProps),
                Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_3__["Text"], { testID: `${buttonCaptionClearTestID}$caption`, style: styles.buttonClearCaption }, buttonCaptionClear)),
            Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_components_Touchable__WEBPACK_IMPORTED_MODULE_5__["Touchable"], Object.assign({ testID: `${buttonCaptionSaveTestID}$Touchable`, onPress: () => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.readSignature(); }, accessible: false, style: buttonSaveContainerStyles }, buttonSaveContainerProps),
                Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_3__["Text"], { testID: `${buttonCaptionSaveTestID}$caption`, style: styles.buttonSaveCaption }, buttonCaptionSave)))));
}


/***/ }),

/***/ "./src/ui/Styles.ts":
/*!**************************!*\
  !*** ./src/ui/Styles.ts ***!
  \**************************/
/*! exports provided: defaultSignatureStyle, webStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSignatureStyle", function() { return defaultSignatureStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webStyles", function() { return webStyles; });
const buttonContainer = {
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8
};
const defaultSignatureStyle = {
    container: {
        penColor: "black",
        backgroundColor: "white"
    },
    buttonWrapper: {
        flexDirection: "row",
        paddingTop: 16
    },
    buttonClearContainer: {
        ...buttonContainer,
        borderColor: "#0595DB",
        backgroundColor: "transparent",
        marginRight: 8
    },
    buttonSaveContainer: {
        ...buttonContainer,
        borderColor: "#0595DB",
        backgroundColor: "#0595DB",
        marginLeft: 8
    },
    buttonClearCaption: {
        color: "#0595DB",
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "bold"
    },
    buttonSaveCaption: {
        color: "#FFF",
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "bold"
    }
};
const webStyles = `
    .m-signature-pad {
        border: none;
    }
    .m-signature-pad--body {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: none;
    }
    .m-signature-pad--body canvas {
        border-radius: 0;
        box-shadow: none;
    }
    .m-signature-pad--footer {
        display: none;
    }
`;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-native":
/*!*******************************!*\
  !*** external "react-native" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-native");

/***/ }),

/***/ "react-native-webview":
/*!***************************************!*\
  !*** external "react-native-webview" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-native-webview");

/***/ })

/******/ });
//# sourceMappingURL=Signature.js.map