// const INIT_STATE = {
//     currentUser: {},
//     loading: true
// }

// export default (state = INIT_STATE, action) => {
//     switch(action.type){
//         case "GET_CURRENT_USER":
//             return {...state, currentUser: action.payload}
//         case 'GET_CART':
//             return {...state, cart: action.payload}
//         case 'CHANGE_COUNT':
//             return {...state, cartLength: action.payload}
//         case 'GET_PRODUCTS_DETAILS':
//             return {...state, productDetails: action.payload}
//         case 'CHANGE_DATA_LIMIT':
//             return {...state, dataLimit: action.payload}
//         case 'NULIFY_DATA_LIMIT':
//             return {...state, dataLimit: action.payload}
//         default: return state
//     }
// }