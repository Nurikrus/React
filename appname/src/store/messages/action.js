import { AUTHORS } from "../../utils/constants";
import { onValue, ref, set } from "@firebase/database";
import { db } from "../../components/Firebase";

export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGE::DELETE_MESSAGE';
export const SET_MESSAGES = "MESSAGES::SET_MESSAGES";

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

const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages,
});

let timeout;

export const addMessageWithReply = (chatId, text, author) => (dispatch) => {
    dispatch(addMessage(chatId, text, author));
    if (author === AUTHORS.HUMAN) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            dispatch(addMessage(chatId, "I am bot", AUTHORS.BOT));
            dispatch(addMessageFb("I am bot", AUTHORS.BOT, chatId));
        }, 1500);
    }
};

export const initMessages = () => (dispatch) => {
    onValue(ref(db, 'messages'), (snapshot) => {
        const data = snapshot.val();
        dispatch(setMessages(data || {}));
    });
}

export const addMessageFb = (text, author, chatId) => (dispatch) => {
    const newId = `message-${Date.now()}`;
    set(ref(db, `messages/${chatId}/${newId}`), {
        author,
        text,
        id: newId,
    });
}