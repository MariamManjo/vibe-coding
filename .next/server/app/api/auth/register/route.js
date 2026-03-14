"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/register/route";
exports.ids = ["app/api/auth/register/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_runner_workspace_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/register/route.ts */ \"(rsc)/./app/api/auth/register/route.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_home_runner_workspace_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__]);\n_home_runner_workspace_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/register/route\",\n        pathname: \"/api/auth/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/register/route\"\n    },\n    resolvedPagePath: \"/home/runner/workspace/app/api/auth/register/route.ts\",\n    nextConfigOutput,\n    userland: _home_runner_workspace_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/register/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcmVnaXN0ZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGcnVubmVyJTJGd29ya3NwYWNlJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGcnVubmVyJTJGd29ya3NwYWNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNLO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZILHFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmliZS1jb2RpbmctcGxhdGZvcm0vPzZkNDgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9hcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3JlZ2lzdGVyXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9hcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/register/route.ts":
/*!****************************************!*\
  !*** ./app/api/auth/register/route.ts ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/session */ \"(rsc)/./lib/session.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_2__]);\n_lib_db__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nasync function POST(req) {\n    const { email, password } = await req.json();\n    if (!email || !password) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Email and password are required.\"\n        }, {\n            status: 400\n        });\n    }\n    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim())) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Please enter a valid email address.\"\n        }, {\n            status: 400\n        });\n    }\n    if (password.length < 8) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Password must be at least 8 characters.\"\n        }, {\n            status: 400\n        });\n    }\n    const hash = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(password, 12);\n    try {\n        const { rows } = await _lib_db__WEBPACK_IMPORTED_MODULE_2__[\"default\"].query(`INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email`, [\n            email.trim().toLowerCase(),\n            hash\n        ]);\n        const user = rows[0];\n        const token = (0,_lib_session__WEBPACK_IMPORTED_MODULE_3__.createToken)({\n            userId: user.id,\n            email: user.email\n        });\n        const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            email: user.email\n        });\n        res.cookies.set((0,_lib_session__WEBPACK_IMPORTED_MODULE_3__.sessionCookieOptions)(token));\n        return res;\n    } catch (err) {\n        const pgErr = err;\n        if (pgErr.code === \"23505\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"email_exists\"\n            }, {\n                status: 409\n            });\n        }\n        console.error(\"[register]\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Registration failed. Please try again.\"\n        }, {\n            status: 500\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDMUI7QUFDRjtBQUNzQztBQUUzRCxlQUFlSyxLQUFLQyxHQUFnQjtJQUN6QyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUYsSUFBSUcsSUFBSTtJQUUxQyxJQUFJLENBQUNGLFNBQVMsQ0FBQ0MsVUFBVTtRQUN2QixPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBbUMsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDeEY7SUFDQSxJQUFJLENBQUMsNkJBQTZCQyxJQUFJLENBQUNMLE1BQU1NLElBQUksS0FBSztRQUNwRCxPQUFPYixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBc0MsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDM0Y7SUFDQSxJQUFJSCxTQUFTTSxNQUFNLEdBQUcsR0FBRztRQUN2QixPQUFPZCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMEMsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDL0Y7SUFFQSxNQUFNSSxPQUFPLE1BQU1kLHFEQUFXLENBQUNPLFVBQVU7SUFFekMsSUFBSTtRQUNGLE1BQU0sRUFBRVEsSUFBSSxFQUFFLEdBQUcsTUFBTWQsK0NBQUlBLENBQUNlLEtBQUssQ0FDL0IsQ0FBQyw0RUFBNEUsQ0FBQyxFQUM5RTtZQUFDVixNQUFNTSxJQUFJLEdBQUdLLFdBQVc7WUFBSUg7U0FBSztRQUVwQyxNQUFNSSxPQUFPSCxJQUFJLENBQUMsRUFBRTtRQUNwQixNQUFNSSxRQUFRakIseURBQVdBLENBQUM7WUFBRWtCLFFBQVFGLEtBQUtHLEVBQUU7WUFBRWYsT0FBT1ksS0FBS1osS0FBSztRQUFDO1FBQy9ELE1BQU1nQixNQUFNdkIscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFZSxTQUFTO1lBQU1qQixPQUFPWSxLQUFLWixLQUFLO1FBQUM7UUFDakVnQixJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ3RCLGtFQUFvQkEsQ0FBQ2dCO1FBQ3JDLE9BQU9HO0lBQ1QsRUFBRSxPQUFPSSxLQUFjO1FBQ3JCLE1BQU1DLFFBQVFEO1FBQ2QsSUFBSUMsTUFBTUMsSUFBSSxLQUFLLFNBQVM7WUFDMUIsT0FBTzdCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFDQW1CLFFBQVFwQixLQUFLLENBQUMsY0FBY2lCO1FBQzVCLE9BQU8zQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBeUMsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDOUY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpYmUtY29kaW5nLXBsYXRmb3JtLy4vYXBwL2FwaS9hdXRoL3JlZ2lzdGVyL3JvdXRlLnRzPzRhOGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcbmltcG9ydCBwb29sIGZyb20gXCJAL2xpYi9kYlwiO1xuaW1wb3J0IHsgY3JlYXRlVG9rZW4sIHNlc3Npb25Db29raWVPcHRpb25zIH0gZnJvbSBcIkAvbGliL3Nlc3Npb25cIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYXdhaXQgcmVxLmpzb24oKSBhcyB7IGVtYWlsPzogc3RyaW5nOyBwYXNzd29yZD86IHN0cmluZyB9O1xuXG4gIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZC5cIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG4gIGlmICghL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC8udGVzdChlbWFpbC50cmltKCkpKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG4gIGlmIChwYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMuXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgfVxuXG4gIGNvbnN0IGhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KFxuICAgICAgYElOU0VSVCBJTlRPIHVzZXJzIChlbWFpbCwgcGFzc3dvcmRfaGFzaCkgVkFMVUVTICgkMSwgJDIpIFJFVFVSTklORyBpZCwgZW1haWxgLFxuICAgICAgW2VtYWlsLnRyaW0oKS50b0xvd2VyQ2FzZSgpLCBoYXNoXVxuICAgICk7XG4gICAgY29uc3QgdXNlciA9IHJvd3NbMF07XG4gICAgY29uc3QgdG9rZW4gPSBjcmVhdGVUb2tlbih7IHVzZXJJZDogdXNlci5pZCwgZW1haWw6IHVzZXIuZW1haWwgfSk7XG4gICAgY29uc3QgcmVzID0gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBlbWFpbDogdXNlci5lbWFpbCB9KTtcbiAgICByZXMuY29va2llcy5zZXQoc2Vzc2lvbkNvb2tpZU9wdGlvbnModG9rZW4pKTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICBjb25zdCBwZ0VyciA9IGVyciBhcyB7IGNvZGU/OiBzdHJpbmcgfTtcbiAgICBpZiAocGdFcnIuY29kZSA9PT0gXCIyMzUwNVwiKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJlbWFpbF9leGlzdHNcIiB9LCB7IHN0YXR1czogNDA5IH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKFwiW3JlZ2lzdGVyXVwiLCBlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlJlZ2lzdHJhdGlvbiBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImJjcnlwdCIsInBvb2wiLCJjcmVhdGVUb2tlbiIsInNlc3Npb25Db29raWVPcHRpb25zIiwiUE9TVCIsInJlcSIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ0ZXN0IiwidHJpbSIsImxlbmd0aCIsImhhc2giLCJyb3dzIiwicXVlcnkiLCJ0b0xvd2VyQ2FzZSIsInVzZXIiLCJ0b2tlbiIsInVzZXJJZCIsImlkIiwicmVzIiwic3VjY2VzcyIsImNvb2tpZXMiLCJzZXQiLCJlcnIiLCJwZ0VyciIsImNvZGUiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/register/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString: process.env.DATABASE_URL\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsT0FBTyxJQUFJRCxvQ0FBSUEsQ0FBQztJQUFFRSxrQkFBa0JDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWTtBQUFDO0FBQ25FLGlFQUFlSixJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmliZS1jb2RpbmctcGxhdGZvcm0vLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb29sIH0gZnJvbSBcInBnXCI7XG5cbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7IGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB9KTtcbmV4cG9ydCBkZWZhdWx0IHBvb2w7XG4iXSwibmFtZXMiOlsiUG9vbCIsInBvb2wiLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./lib/session.ts":
/*!************************!*\
  !*** ./lib/session.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COOKIE: () => (/* binding */ COOKIE),\n/* harmony export */   clearCookieOptions: () => (/* binding */ clearCookieOptions),\n/* harmony export */   createToken: () => (/* binding */ createToken),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   sessionCookieOptions: () => (/* binding */ sessionCookieOptions),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst SECRET = process.env.NEXTAUTH_SECRET ?? \"vibe-coding-fallback-secret-change-in-prod\";\nconst COOKIE = \"vbc_session\";\nconst MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds\nfunction createToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, SECRET, {\n        expiresIn: \"7d\"\n    });\n}\nfunction verifyToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, SECRET);\n    } catch  {\n        return null;\n    }\n}\nfunction getSession() {\n    const token = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().get(COOKIE)?.value;\n    if (!token) return null;\n    return verifyToken(token);\n}\nfunction sessionCookieOptions(token) {\n    return {\n        name: COOKIE,\n        value: token,\n        httpOnly: true,\n        secure: \"development\" === \"production\",\n        sameSite: \"lax\",\n        maxAge: MAX_AGE,\n        path: \"/\"\n    };\n}\nfunction clearCookieOptions() {\n    return {\n        name: COOKIE,\n        value: \"\",\n        httpOnly: true,\n        secure: \"development\" === \"production\",\n        sameSite: \"lax\",\n        maxAge: 0,\n        path: \"/\"\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2Vzc2lvbi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBK0I7QUFDUTtBQUV2QyxNQUFNRSxTQUNKQyxRQUFRQyxHQUFHLENBQUNDLGVBQWUsSUFBSTtBQUUxQixNQUFNQyxTQUFTLGNBQWM7QUFDcEMsTUFBTUMsVUFBVSxLQUFLLEtBQUssS0FBSyxHQUFHLG9CQUFvQjtBQU8vQyxTQUFTQyxZQUFZQyxPQUF1QjtJQUNqRCxPQUFPVCx3REFBUSxDQUFDUyxTQUFTUCxRQUFRO1FBQUVTLFdBQVc7SUFBSztBQUNyRDtBQUVPLFNBQVNDLFlBQVlDLEtBQWE7SUFDdkMsSUFBSTtRQUNGLE9BQU9iLDBEQUFVLENBQUNhLE9BQU9YO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU2E7SUFDZCxNQUFNRixRQUFRWixxREFBT0EsR0FBR2UsR0FBRyxDQUFDVixTQUFTVztJQUNyQyxJQUFJLENBQUNKLE9BQU8sT0FBTztJQUNuQixPQUFPRCxZQUFZQztBQUNyQjtBQUVPLFNBQVNLLHFCQUFxQkwsS0FBYTtJQUNoRCxPQUFPO1FBQ0xNLE1BQU1iO1FBQ05XLE9BQU9KO1FBQ1BPLFVBQVU7UUFDVkMsUUFBUWxCLGtCQUF5QjtRQUNqQ21CLFVBQVU7UUFDVkMsUUFBUWhCO1FBQ1JpQixNQUFNO0lBQ1I7QUFDRjtBQUVPLFNBQVNDO0lBQ2QsT0FBTztRQUNMTixNQUFNYjtRQUNOVyxPQUFPO1FBQ1BHLFVBQVU7UUFDVkMsUUFBUWxCLGtCQUF5QjtRQUNqQ21CLFVBQVU7UUFDVkMsUUFBUTtRQUNSQyxNQUFNO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpYmUtY29kaW5nLXBsYXRmb3JtLy4vbGliL3Nlc3Npb24udHM/MWRlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5cbmNvbnN0IFNFQ1JFVCA9XG4gIHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCA/PyBcInZpYmUtY29kaW5nLWZhbGxiYWNrLXNlY3JldC1jaGFuZ2UtaW4tcHJvZFwiO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFID0gXCJ2YmNfc2Vzc2lvblwiO1xuY29uc3QgTUFYX0FHRSA9IDYwICogNjAgKiAyNCAqIDc7IC8vIDcgZGF5cyBpbiBzZWNvbmRzXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvblBheWxvYWQge1xuICB1c2VySWQ6IG51bWJlcjtcbiAgZW1haWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRva2VuKHBheWxvYWQ6IFNlc3Npb25QYXlsb2FkKTogc3RyaW5nIHtcbiAgcmV0dXJuIGp3dC5zaWduKHBheWxvYWQsIFNFQ1JFVCwgeyBleHBpcmVzSW46IFwiN2RcIiB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVRva2VuKHRva2VuOiBzdHJpbmcpOiBTZXNzaW9uUGF5bG9hZCB8IG51bGwge1xuICB0cnkge1xuICAgIHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBTRUNSRVQpIGFzIFNlc3Npb25QYXlsb2FkO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpOiBTZXNzaW9uUGF5bG9hZCB8IG51bGwge1xuICBjb25zdCB0b2tlbiA9IGNvb2tpZXMoKS5nZXQoQ09PS0lFKT8udmFsdWU7XG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICByZXR1cm4gdmVyaWZ5VG9rZW4odG9rZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Vzc2lvbkNvb2tpZU9wdGlvbnModG9rZW46IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IENPT0tJRSxcbiAgICB2YWx1ZTogdG9rZW4sXG4gICAgaHR0cE9ubHk6IHRydWUsXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgc2FtZVNpdGU6IFwibGF4XCIgYXMgY29uc3QsXG4gICAgbWF4QWdlOiBNQVhfQUdFLFxuICAgIHBhdGg6IFwiL1wiLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb29raWVPcHRpb25zKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IENPT0tJRSxcbiAgICB2YWx1ZTogXCJcIixcbiAgICBodHRwT25seTogdHJ1ZSxcbiAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgICBzYW1lU2l0ZTogXCJsYXhcIiBhcyBjb25zdCxcbiAgICBtYXhBZ2U6IDAsXG4gICAgcGF0aDogXCIvXCIsXG4gIH07XG59XG4iXSwibmFtZXMiOlsiand0IiwiY29va2llcyIsIlNFQ1JFVCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJDT09LSUUiLCJNQVhfQUdFIiwiY3JlYXRlVG9rZW4iLCJwYXlsb2FkIiwic2lnbiIsImV4cGlyZXNJbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJ2ZXJpZnkiLCJnZXRTZXNzaW9uIiwiZ2V0IiwidmFsdWUiLCJzZXNzaW9uQ29va2llT3B0aW9ucyIsIm5hbWUiLCJodHRwT25seSIsInNlY3VyZSIsInNhbWVTaXRlIiwibWF4QWdlIiwicGF0aCIsImNsZWFyQ29va2llT3B0aW9ucyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/session.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/safe-buffer","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();