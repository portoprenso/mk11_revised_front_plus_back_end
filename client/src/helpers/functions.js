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
  return jwt_decode(data)
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
  getDecodedToken
};
