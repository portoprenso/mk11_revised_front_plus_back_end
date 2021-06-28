const INIT_STATE = {
    productsData: [],
    productDetails: {},
    paginationPages: 1,
    cart: {},
    dataLimit: 8,
    showCaseData: [],
    showCaseDataDetails: {}
    // cartLength: getCountProductsInCart(),
}

export default (state = INIT_STATE, action: {type: string, payload: any}) => {
    switch(action.type){
        case "GET_PRODUCTS_DATA":
            return {...state, productsData: action.payload.data, paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 8)}
        // case "GET_PRODUCTS_DATA_TEST":
        //     return {...state, showCaseData: action.payload.data}
        case 'GET_CART':
            return {...state, cart: action.payload}
        case 'CHANGE_COUNT':
            return {...state, cartLength: action.payload}
        case 'GET_PRODUCTS_DETAILS':
            return {...state, productDetails: action.payload}
        case 'CHANGE_DATA_LIMIT':
            return {...state, dataLimit: action.payload}
        case 'NULIFY_DATA_LIMIT':
            return {...state, dataLimit: action.payload}
        case "GET_SHOWCASE_DATA":
            return {...state, showCaseData: action.payload}
        case "GET_SHOWCASE_DATA_DETAILS":
            return {...state, showCaseDataDetails: action.payload}
        default: return state
    }
}