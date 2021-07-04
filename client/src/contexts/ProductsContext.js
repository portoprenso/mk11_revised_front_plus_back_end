import React, { useContext, useReducer } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const productsContext = React.createContext();


export function useProducts() {
    return useContext(productsContext)
}

let JSON_API = 'http://localhost:8000'

const INIT_STATE = {
    productsData: [],
    productDetails: {},
    paginationPages: 1,
    cart: {},
    dataLimit: 8
    // cartLength: getCountProductsInCart(),
}

function calcSubPrice(product) {
    return product.count * product.item.price
}

function calcTotalPrice(products) {
    let totalPrice = 0;
    products.forEach(item => {
        totalPrice += item.subPrice
    })
    return totalPrice
}



const reducer = (state=INIT_STATE, action) =>{
    switch(action.type){
        case "GET_PRODUCTS_DATA":
            return {...state, productsData: action.payload.data, paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 8)}
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
        default: return state
    }
}


const ProductsContextProvider = ({ children }) => {
    const history = useHistory()
    const getProductsData = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', state.dataLimit)
        history.push(`${history.location.pathname}?${search.toString()}`)
        let res = await axios(`${JSON_API}/products/?_limit=${state.dataLimit}&${window.location.search}`)
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: res
        })
    }

    const changeDataLimit = async (story) => {
        let some = state.dataLimit
        some += 4
        // console.log(some)
        dispatch({
            type: "CHANGE_DATA_LIMIT",
            payload: some
        })
        console.log(state.dataLimit)
        // await getProductsData(story)
    }

    const nulifyDataLimit = async () => {
        let some = 8
        dispatch({
            type: "NULIFY_DATA_LIMIT",
            payload: some
        })
        await history.push('/store/')
        window.scrollTo({top: 0, behavior: 'smooth'});
    }


    const getProductDetails = async (id) => {
        let { data } = await axios(`${JSON_API}/products/${id}`)
        dispatch({
            type: 'GET_PRODUCTS_DETAILS',
            payload: data
        })
    }

    const editProduct = async (id, newObj, story) => {
        await axios.patch(`${JSON_API}/products/${id}`, newObj)
        getProductsData(story)
    }


    function addProductToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        if(filteredCart.length > 0) {
            cart.products.filter(elem => elem.item.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_COUNT",
            payload: cart.products.length
        })
    }

    async function removeProductFromCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let filteredCart = {
            products: [...cart.products.filter(elem => elem.item.id !== product.id)],
            totalPrice: 0            
        }
        await filteredCart.products.filter(elem => elem.item.id !== product.id)
        await localStorage.removeItem('cart')
        filteredCart.totalPrice = calcTotalPrice(filteredCart.products)
        await localStorage.setItem('cart', JSON.stringify(filteredCart))
        await dispatch({
            type: "CHANGE_COUNT",
            payload: filteredCart.products.length
        })
        await getCart()
    }

    async function removeAllProductsFromCart() {
        await localStorage.removeItem('cart')
        await dispatch({
            type: "CHANGE_COUNT",
            payload: null
        })
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    function changeProductCount(count, id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if(elem.item.id === id) {
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }

    async function addNewProduct(newGame, story) {
        await axios.post(`${JSON_API}/products`, newGame)
        getProductsData(story)
        alert('Новый продукт создан!')
    }

    async function deleteProduct(id, story) {
        await axios.delete(`${JSON_API}/products/${id}`)
        getProductsData(story)
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    let values = {
        productsData: state.productsData,
        paginationPages: state.paginationPages,
        cartLength: state.cartLength,
        cart: state.cart,
        productDetails: state.productDetails,
        dataLimit: state.dataLimit,
        getProductsData,
        addProductToCart,
        getCart,
        changeProductCount,
        checkProductInCart,
        addNewProduct,
        deleteProduct,
        getProductDetails,
        editProduct,
        removeProductFromCart,
        removeAllProductsFromCart,
        changeDataLimit,
        nulifyDataLimit
    }

    return (
        <productsContext.Provider value={values}>
            {children}
        </productsContext.Provider>
    )
}
export default ProductsContextProvider;