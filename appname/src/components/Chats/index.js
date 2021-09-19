import { useEffect, useCallback, useMemo } from "react";
import { Message } from "../Message";
import { Form } from "../Form";
import { AUTHORS } from "../../utils/constants";
import { ChatList } from "../Chat";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from '../../store/chats/action';
import { addMessage } from "../../store/messages/action";

function Chats() {

    const { chatId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const messages = useSelector(state => state.messages.messages);
    const chats = useSelector(state => state.chats.chats);

    const sendMessage = useCallback((text, author) => {
        dispatch(addMessage(chatId, text, author))
    }, [chatId, dispatch])

    useEffect(() => {
        let timeOut;

        if (!!chatId && !!messages[chatId] && messages[chatId][messages[chatId].length - 1]?.author === AUTHORS.HUMAN) {
            timeOut = setTimeout(() => {
                sendMessage("I am bot", AUTHORS.BOT);
            }, 1000);
        }

        return () => clearTimeout(timeOut);
    }, [messages, chatId, sendMessage]);

    const handleAddMessage = useCallback((text) => {
        sendMessage(text, AUTHORS.HUMAN)
    }, [sendMessage]);

    const handleAddChat = useCallback((name) => {
        dispatch(addChat(name));

    }, [dispatch]);

    const handleDeleteChat = useCallback((id) => {
        dispatch(deleteChat(id))

        if (chatId !== id) {
            return;
        }
        if (chats.length === 1) {
            history.push(`/chats/${chats[0].id}`);
        } else {
            history.push(`/chats`);
        }

    }, [chats, chatId, history, dispatch]);

    const chatExists = useMemo(() => !!chats.find(({ id }) => id === chatId), [chatId, chats])

    return (
        <div className="App">
            <ChatList chats={chats} onAddChat={handleAddChat} onDeleteChat={handleDeleteChat} />
            {!!chatId && chatExists &&
                <>
                    {
                        (messages[chatId] || []).map((message, i) => (
                            <Message
                                key={message.id}
                                text={message.text}
                                id={message.id}
                            />
                        ))
                    }
                    < Form onSubmit={handleAddMessage} />
                </>
            }
        </div>
    );
}

export default Chats;
