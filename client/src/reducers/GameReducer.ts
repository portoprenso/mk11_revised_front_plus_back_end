import { CHANGE_COUNT, CHANGE_DATA_LIMIT, GET_CART, GET_PRODUCTS_DATA, GET_PRODUCTS_DETAILS, GET_SHOWCASE_DATA, GET_SHOWCASE_DATA_DETAILS, NULIFY_DATA_LIMIT } from './../types/gameTypes';
interface gameState {
    productsData: any[],
    productDetails: {},
    paginationPages: number | string,
    // cart: {
    //     games: any[]
    // },
    dataLimit: number | string,
    showCaseData: any[],
    showCaseDataDetails: {}
}

const INIT_STATE: gameState = {
    productsData: [],
    productDetails: {},
    paginationPages: 1,
    // cart: {},
    dataLimit: 4,
    showCaseData: [],
    showCaseDataDetails: {}
}

export default (state = INIT_STATE, action: { type: string, payload: any }) => {
    switch (action.type) {
        case GET_PRODUCTS_DATA:
            return { ...state, productsData: action.payload.data, paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 8) }
        case GET_CART:
            return { ...state, cart: action.payload }
        case CHANGE_COUNT:
            return { ...state, cartLength: action.payload }
        case GET_PRODUCTS_DETAILS:
            return { ...state, productDetails: action.payload }
        case CHANGE_DATA_LIMIT:
            return { ...state, dataLimit: action.payload }
        case NULIFY_DATA_LIMIT:
            return { ...state, dataLimit: action.payload }
        case GET_SHOWCASE_DATA:
            return { ...state, showCaseData: action.payload }
        case GET_SHOWCASE_DATA_DETAILS:
            return { ...state, showCaseDataDetails: action.payload }
        default: return state
    }
}