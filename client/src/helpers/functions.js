import axios from "axios";
import jwt_decode from "jwt-decode";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);
const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  console.log(data)
  return data;
};

const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

const fetchOneGameInfo = async (id) => {
  const { data } = await $host.get("api/game/" + id);
  return data;
};

const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

const getDecodedToken = async () => {
  const data = await localStorage.getItem("token")
  console.log(data)
  if (data){
    return jwt_decode(data)
  }
  else {
    return ""
  }
}

const destroyToken = () => {
  localStorage.removeItem("token")
}

function calcSubPrice(game) {
  return game.count * game.price
}

function calcTotalPrice(games) {
  let totalPrice = 0;
  games.forEach(game => {
      totalPrice += game.subPrice
  })
  return totalPrice
}

async function getCart() {
  let cart = await JSON.parse(localStorage.getItem('cart'))
  if (!cart) {
      cart = {
          products: [],
          totalPrice: 0
      }
  }
  return cart
}



const addProductToCart = (gameId, price) => {
  let cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart) {
      cart = {
          games: [],
          totalPrice: 0
      }
  }
  let newGame = {
      gameId,
      price,
      count: 1,
      subPrice: 0
  }

  let filteredCart = cart.games.filter(elem => elem.gameId === gameId)
  if(filteredCart.length > 0) {
      cart.games.filter(elem => elem.gameId !== gameId)
  }
  else {
      cart.games.push(newGame)
  }
  newGame.subPrice = calcSubPrice(newGame)
  cart.totalPrice = calcTotalPrice(cart.games)
  localStorage.setItem('cart', JSON.stringify(cart))
  // dispatch({
  //     type: "CHANGE_COUNT",
  //     payload: cart.products.length
  // })
}

function changeProductCount(count, id) {
  let cart = JSON.parse(localStorage.getItem('cart'))
  console.log(cart)
  cart.games = cart.games.map(elem => {
      if(elem.gameId === id) {
          elem.count = parseInt(count)
          elem.subPrice = calcSubPrice(elem)
      }
      return elem
  })
  cart.totalPrice = calcTotalPrice(cart.games)
  localStorage.setItem('cart', JSON.stringify(cart))
  getCart()
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
  await getCart()
}

async function removeAllProductsFromCart() {
  await localStorage.removeItem('cart')
}

export {
  $host,
  $authHost,
  createType,
  fetchTypes,
  createBrand,
  fetchBrands,
  createDevice,
  fetchDevices,
  fetchOneGameInfo,
  check,
  login,
  registration,
  getDecodedToken,
  destroyToken,
  addProductToCart,
  calcTotalPrice,
  calcSubPrice,
  getCart,
  changeProductCount,
  removeProductFromCart,
  removeAllProductsFromCart
};
