// runtime can't be in strict mode because a global variable is assign and maybe created.
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["middleware"],{

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "(middleware)/./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch%5Cmiddleware.ts&page=%2Fmiddleware&rootDir=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch&matchers=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch%5Cmiddleware.ts&page=%2Fmiddleware&rootDir=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch&matchers=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ nHandler)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/globals */ \"(middleware)/./node_modules/next/dist/esm/server/web/globals.js\");\n/* harmony import */ var next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/web/adapter */ \"(middleware)/./node_modules/next/dist/esm/server/web/adapter.js\");\n/* harmony import */ var _middleware_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware.ts */ \"(middleware)/./middleware.ts\");\n\n\n// Import the userland code.\n\nconst mod = {\n    ..._middleware_ts__WEBPACK_IMPORTED_MODULE_2__\n};\nconst handler = mod.middleware || mod.default;\nconst page = \"/middleware\";\nif (typeof handler !== \"function\") {\n    throw new Error(`The Middleware \"${page}\" must export a \\`middleware\\` or a \\`default\\` function`);\n}\nfunction nHandler(opts) {\n    return (0,next_dist_server_web_adapter__WEBPACK_IMPORTED_MODULE_1__.adapter)({\n        ...opts,\n        page,\n        handler\n    });\n}\n\n//# sourceMappingURL=middleware.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1taWRkbGV3YXJlLWxvYWRlci5qcz9hYnNvbHV0ZVBhZ2VQYXRoPUMlM0ElNUNVc2VycyU1Q1JhZmFsJTVDRGVza3RvcCU1Q0R5bmFtaWN6bmElNUNtb3RvYXV0by1jaCU1Q21pZGRsZXdhcmUudHMmcGFnZT0lMkZtaWRkbGV3YXJlJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDUmFmYWwlNUNEZXNrdG9wJTVDRHluYW1pY3puYSU1Q21vdG9hdXRvLWNoJm1hdGNoZXJzPSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNDO0FBQ2lCO0FBQ3ZEO0FBQ3dDO0FBQ3hDO0FBQ0EsT0FBTywyQ0FBSTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUM7QUFDZTtBQUNmLFdBQVcscUVBQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8/Njk4NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJuZXh0L2Rpc3Qvc2VydmVyL3dlYi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBhZGFwdGVyIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvd2ViL2FkYXB0ZXJcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIF9tb2QgZnJvbSBcIi4vbWlkZGxld2FyZS50c1wiO1xuY29uc3QgbW9kID0ge1xuICAgIC4uLl9tb2Rcbn07XG5jb25zdCBoYW5kbGVyID0gbW9kLm1pZGRsZXdhcmUgfHwgbW9kLmRlZmF1bHQ7XG5jb25zdCBwYWdlID0gXCIvbWlkZGxld2FyZVwiO1xuaWYgKHR5cGVvZiBoYW5kbGVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBNaWRkbGV3YXJlIFwiJHtwYWdlfVwiIG11c3QgZXhwb3J0IGEgXFxgbWlkZGxld2FyZVxcYCBvciBhIFxcYGRlZmF1bHRcXGAgZnVuY3Rpb25gKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5IYW5kbGVyKG9wdHMpIHtcbiAgICByZXR1cm4gYWRhcHRlcih7XG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGhhbmRsZXJcbiAgICB9KTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWlkZGxld2FyZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch%5Cmiddleware.ts&page=%2Fmiddleware&rootDir=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch&matchers=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_intl_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-intl/middleware */ \"(middleware)/./node_modules/next-intl/dist/esm/development/middleware/middleware.js\");\n/* harmony import */ var _src_i18n_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/i18n/routing */ \"(middleware)/./src/i18n/routing.ts\");\n\n\n// Middleware obsługuje negocjację locale i przekierowania\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_intl_middleware__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_src_i18n_routing__WEBPACK_IMPORTED_MODULE_0__.routing));\nconst config = {\n    // dopasuj wszystkie ścieżki oprócz /api, /_next i plików statycznych\n    matcher: [\n        \"/((?!api|_next|.*\\\\..*).*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQW9EO0FBQ1A7QUFFN0MsMERBQTBEO0FBQzFELGlFQUFlQSxnRUFBZ0JBLENBQUNDLHNEQUFPQSxDQUFDQSxFQUFDO0FBRWxDLE1BQU1DLFNBQVM7SUFDcEIscUVBQXFFO0lBQ3JFQyxTQUFTO1FBQUM7S0FBNkI7QUFDekMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9taWRkbGV3YXJlLnRzPzQyMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZU1pZGRsZXdhcmUgZnJvbSAnbmV4dC1pbnRsL21pZGRsZXdhcmUnO1xyXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSAnLi9zcmMvaTE4bi9yb3V0aW5nJztcclxuXHJcbi8vIE1pZGRsZXdhcmUgb2JzxYJ1Z3VqZSBuZWdvY2phY2rEmSBsb2NhbGUgaSBwcnpla2llcm93YW5pYVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNaWRkbGV3YXJlKHJvdXRpbmcpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICAvLyBkb3Bhc3VqIHdzenlzdGtpZSDFm2NpZcW8a2kgb3Byw7NjeiAvYXBpLCAvX25leHQgaSBwbGlrw7N3IHN0YXR5Y3pueWNoXHJcbiAgbWF0Y2hlcjogWycvKCg/IWFwaXxfbmV4dHwuKlxcXFwuLiopLiopJ10sXHJcbn07Il0sIm5hbWVzIjpbImNyZWF0ZU1pZGRsZXdhcmUiLCJyb3V0aW5nIiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ }),

/***/ "(middleware)/./src/i18n/routing.ts":
/*!*****************************!*\
  !*** ./src/i18n/routing.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   routing: () => (/* binding */ routing)\n/* harmony export */ });\n/* harmony import */ var next_intl_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-intl/routing */ \"(middleware)/./node_modules/next-intl/dist/esm/development/routing/defineRouting.js\");\n\nconst routing = (0,next_intl_routing__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    locales: [\n        \"pl\",\n        \"en\"\n    ],\n    defaultLocale: \"pl\",\n    localePrefix: \"as-needed\" // brak prefiksu dla domyślnego locale\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL2kxOG4vcm91dGluZy50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFrRDtBQUUzQyxNQUFNQyxVQUFVRCw2REFBYUEsQ0FBQztJQUNuQ0UsU0FBUztRQUFDO1FBQU07S0FBSztJQUNyQkMsZUFBZTtJQUNmQyxjQUFjLFlBQWlCLHNDQUFzQztBQUN2RSxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9pMThuL3JvdXRpbmcudHM/MDY4MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVSb3V0aW5nIH0gZnJvbSAnbmV4dC1pbnRsL3JvdXRpbmcnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRpbmcgPSBkZWZpbmVSb3V0aW5nKHtcclxuICBsb2NhbGVzOiBbJ3BsJywgJ2VuJ10sICAgICAgICAgLy8gbGlzdGEgb2JzxYJ1Z2l3YW55Y2ggasSZenlrw7N3XHJcbiAgZGVmYXVsdExvY2FsZTogJ3BsJywgICAgICAgICAgIC8vIGRvbXnFm2xueSBqxJl6eWtcclxuICBsb2NhbGVQcmVmaXg6ICdhcy1uZWVkZWQnICAgICAgLy8gYnJhayBwcmVmaWtzdSBkbGEgZG9tecWbbG5lZ28gbG9jYWxlXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiZGVmaW5lUm91dGluZyIsInJvdXRpbmciLCJsb2NhbGVzIiwiZGVmYXVsdExvY2FsZSIsImxvY2FsZVByZWZpeCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/i18n/routing.ts\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__("(middleware)/./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch%5Cmiddleware.ts&page=%2Fmiddleware&rootDir=C%3A%5CUsers%5CRafal%5CDesktop%5CDynamiczna%5Cmotoauto-ch&matchers=&preferredRegion=&middlewareConfig=e30%3D!")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_middleware = __webpack_exports__;
/******/ }
]);