import { GET_CURRENT_USER } from './../types/authTypes';

interface authState {
    user: {},
    loading: boolean
}

interface AuthAction { type: string, payload?: any }

const INIT_STATE: authState = {
    user: {},
    loading: true
}

export default (state = INIT_STATE, action: AuthAction) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...state, user: action.payload }
        default: return state
    }
}