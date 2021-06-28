"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var rootReducer_1 = require("../reducers/rootReducer");
var store = redux_1.createStore(rootReducer_1["default"], redux_1.applyMiddleware(redux_thunk_1["default"]));
console.log(store);
exports["default"] = store;
