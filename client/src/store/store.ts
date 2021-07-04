import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

// export function createStore(rootReducer, initialState){
//     let state = rootReducer(initialState, {type: '__INIT__'})
//     const subscribers = []
//     return {
//         dispatch(action) {
//             state = rootReducer(state, action);
//             subscribers.forEach(sub => sub())
//         },
//         subscribe(callback) {
//         subscribers.push(callback)           
//         },
//         getState() {
//             return state
//         }
//     }
// }

export type storeType = {
    history: any,
    getProductsData: (history: any, dataLimit: string) => [],
    productsData: any,
    dataLimit: any,
    changeDataLimit: any,
    showCaseData: any
}

const store = createStore(rootReducer, applyMiddleware(thunk))
// console.log(store)

export default store