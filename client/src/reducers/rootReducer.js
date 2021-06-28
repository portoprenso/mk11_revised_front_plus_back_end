"use strict";
exports.__esModule = true;
exports.rootReducer = void 0;
var redux_1 = require("redux");
var RosterReducer_1 = require("./RosterReducer");
var ProductsReducer_1 = require("./ProductsReducer");
exports.rootReducer = redux_1.combineReducers({
    rosterReducer: RosterReducer_1["default"],
    productReducer: ProductsReducer_1["default"]
});
exports["default"] = exports.rootReducer;
