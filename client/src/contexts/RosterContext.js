import axios from 'axios';
import React, { useContext, useReducer } from 'react';


let JSON_API = 'http://localhost:8000'

const rosterContext = React.createContext()

export function useRoster() {
    return useContext(rosterContext)
}

const INIT_STATE = {
    rosterData: [],
    productsData: [],
    fighterInfo: {},
    getFighterInfo: {},
    productInfo: {},
}

const reducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case "GET_ROSTER_DATA":
            return {...state, rosterData: action.payload} 
        case "GET_FIGHTER_DATA":
            return {... state, fighterInfo: action.payload}
        default: return state
    }
}


const RosterContextProvider = ({children}) => {

    const getRosterData = async () => {
        let { data } = await axios(`${JSON_API}/roster`)
        // console.log(data)
        dispatch({
            type: "GET_ROSTER_DATA",
            payload: data
        })
    }

    const getFighterInfo = async (id) => {
        let { data } = await axios(`${JSON_API}/roster/${id}/`)
        dispatch({
            type: "GET_FIGHTER_DATA",
            payload: data
        })
    }

    const addNewFighter = async (newPerson) => {
        await axios.post(`${JSON_API}/roster`, newPerson)
        getRosterData()
    }

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    let value = {
        rosterData: state.rosterData,
        fighterInfo: state.fighterInfo,
        getRosterData,
        getFighterInfo,
        addNewFighter
    }
    
    return (
        <rosterContext.Provider value={value}>
            {children}
        </rosterContext.Provider>
    );
};

export default RosterContextProvider;