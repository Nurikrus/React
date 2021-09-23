import { useCallback, useMemo } from "react";
import { Message } from "../Message";
import { Form } from "../Form";
import { AUTHORS } from "../../utils/constants";
import { ChatList } from "../Chat";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from '../../store/chats/action';
import { addMessageWithReply } from "../../store/messages/action";
import { selectChats, selectChatsLength, selectFirstChatId, selectIfChatExists } from "../../store/chats/selectors";
import { selectMessages } from "../../store/messages/selector";

function Chats() {

    const { chatId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const messages = useSelector(selectMessages);
    const chats = useSelector(selectChats);
    const chatsLength = useSelector(selectChatsLength);
    const firstChatId = useSelector(selectFirstChatId);

    const selectChatExists = useMemo(() => selectIfChatExists(chatId), [chatId]);
    const chatExists = useSelector(selectChatExists);


    const sendMessage = useCallback((text, author) => {
        dispatch(addMessageWithReply(chatId, text, author))
    }, [chatId, dispatch])


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
        };

        if (chatsLength === 1) {
            history.push(`/chats`);
        } else {
            history.push(`/chats/${firstChatId}`);
        }

    }, [chatId, history, dispatch, chatsLength, firstChatId]);



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
                    <Form onSubmit={handleAddMessage} />
                </>
            }
        </div>
    );
}

export default Chats;
