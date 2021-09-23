import { DELETE_CHAT } from "../chats/action";
import { ADD_MESSAGE, DELETE_MESSAGE } from "./action";

const initialState = {
    messages: {},
}

export const messagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [payload.chatId]: [
                        ...(state.messages[payload.chatId] || []),
                        {
                            id: `message-${Date.now()}`,
                            text: payload.text,
                            author: payload.author
                        },
                    ],
                },
            };
        }
        case DELETE_MESSAGE: {
            const deleteChatMessage = state.messages[payload.chatId].filter(({ id }) => id !== payload.id);
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [payload.chatId]: deleteChatMessage,
                }
            };
        }
        case DELETE_CHAT: {
            const deleteMessage = { ...state.messages };
            delete state.messages[payload];

            return {
                ...state,
                messages: deleteMessage,
            };
        }
        default:
            return state;
    }
}