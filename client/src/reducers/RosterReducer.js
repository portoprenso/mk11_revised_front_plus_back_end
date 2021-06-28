"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var INIT_STATE = {
    rosterData: [],
    productsData: [],
    fighterInfo: {},
    getFighterInfo: {},
    productInfo: {}
};
exports["default"] = (function (state, action) {
    if (state === void 0) { state = INIT_STATE; }
    switch (action.type) {
        case "GET_ROSTER_DATA":
            return __assign(__assign({}, state), { rosterData: action.payload });
        case "GET_FIGHTER_DATA":
            return __assign(__assign({}, state), { fighterInfo: action.payload });
        default: return state;
    }
});
