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
    productsData: [],
    productDetails: {},
    paginationPages: 1,
    cart: {},
    dataLimit: 8,
    showCaseData: [],
    showCaseDataDetails: {}
    // cartLength: getCountProductsInCart(),
};
exports["default"] = (function (state, action) {
    if (state === void 0) { state = INIT_STATE; }
    switch (action.type) {
        case "GET_PRODUCTS_DATA":
            return __assign(__assign({}, state), { productsData: action.payload.data, paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 8) });
        // case "GET_PRODUCTS_DATA_TEST":
        //     return {...state, showCaseData: action.payload.data}
        case 'GET_CART':
            return __assign(__assign({}, state), { cart: action.payload });
        case 'CHANGE_COUNT':
            return __assign(__assign({}, state), { cartLength: action.payload });
        case 'GET_PRODUCTS_DETAILS':
            return __assign(__assign({}, state), { productDetails: action.payload });
        case 'CHANGE_DATA_LIMIT':
            return __assign(__assign({}, state), { dataLimit: action.payload });
        case 'NULIFY_DATA_LIMIT':
            return __assign(__assign({}, state), { dataLimit: action.payload });
        case "GET_SHOWCASE_DATA":
            return __assign(__assign({}, state), { showCaseData: action.payload });
        case "GET_SHOWCASE_DATA_DETAILS":
            return __assign(__assign({}, state), { showCaseDataDetails: action.payload });
        default: return state;
    }
});
