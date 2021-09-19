import { ADD_CHAT, DELETE_CHAT } from "./action"

const initialState = {
    chats: [],
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, { id: `chats-${Date.now()}`, name: action.payload }],
            };
        }
        case DELETE_CHAT: {
            const deleteChat = state.chats.filter(({ id }) => id !== action.payload);
            return {
                ...state,
                chats: deleteChat,
            };
        }
        default:
            return state;
    }
}