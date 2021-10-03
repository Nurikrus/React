import { GET_LOGIN, GET_LOGOUT, GET_SIGNUP } from "./actoin";

const initialState = {
    auth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SIGNUP: {
            return {
                ...state,
                auth: action.payload,
            };
        }
        case GET_LOGIN: {
            return {
                ...state,
                auth: action.payload,
            };
        }
        case GET_LOGOUT: {
            return {
                ...state,
                auth: action.payload,
            };
        }
        default:
            return state;
    }
}