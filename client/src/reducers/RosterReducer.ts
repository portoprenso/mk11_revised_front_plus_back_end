const INIT_STATE = {
    rosterData: [],
    productsData: [],
    fighterInfo: {},
    getFighterInfo: {},
    productInfo: {},
}

export default (state = INIT_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
        case "GET_ROSTER_DATA":
            return {...state, rosterData: action.payload} 
        case "GET_FIGHTER_DATA":
            return {... state, fighterInfo: action.payload}
        default: return state
    }
}