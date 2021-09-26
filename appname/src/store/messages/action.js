import { AUTHORS } from "../../utils/constants";

export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGE::DELETE_MESSAGE';

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
        author,
    },
});

export const deleteMessage = (chatId, id) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        id,
    }
});

let timeout;

export const addMessageWithReply = (chatId, text, author) => (dispatch) => {
    dispatch(addMessage(chatId, text, author));
    if (author === AUTHORS.HUMAN) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            dispatch(addMessage(chatId, "I am bot", AUTHORS.BOT));
        }, 1000);
    }
};