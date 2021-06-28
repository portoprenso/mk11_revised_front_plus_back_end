import axios from "axios";
// let JSON_API = "http://localhost:8000";


// export const getRosterData = async () => {
//     let { data } = await axiosios(`${JSON_API}/roster`);
//     console.log(data);
//     dispatch({
//         type: "GET_ROSTER_DATA",
//         payload: data,
//     });
// };
// export const getProductsData = async () =>
//     dispatch({ type: "GET_PRODUCTS_DATA" });


export const $host = axios.create({
    baseURL: "http://localhost:5000/"
})

export const $authHost = axios.create({
    baseURL: "http://localhost:5000/"
})

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneGameInfo = async (id) => {
    const {data} = await $host.get('api/game/' + id)
    return data
}