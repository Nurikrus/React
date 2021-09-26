import { REQUEST_STATUS } from "../../utils/constants";
import { GET_ARTICLE_FAILURE, GET_ARTICLE_PENDING, GET_ARTICLE_SUCCESS } from "./actoin";

const initialState = {
    list: [],
    request: {
        error: null,
        status: REQUEST_STATUS.IDLE,
    },
};

export const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLE_PENDING: {
            return {
                ...state,
                request: {
                    error: null,
                    status: REQUEST_STATUS.PENDING,
                }
            };
        }
        case GET_ARTICLE_SUCCESS: {
            return {
                ...state,
                request: {
                    ...state.request,
                    status: REQUEST_STATUS.SUCCESS
                },
                list: action.payload,
            };
        }
        case GET_ARTICLE_FAILURE: {
            return {
                ...state,
                request: {
                    error: action.payload,
                    status: REQUEST_STATUS.FAILURE,
                },
            };
        }
        default:
            return state;
    }
}