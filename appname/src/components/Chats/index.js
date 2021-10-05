import { useCallback, useMemo } from "react";
import { Message } from "../Message";
import { ChatList } from "../Chat";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat } from '../../store/chats/action';
import { selectChatsLength, selectFirstChatId, selectIfChatExists } from "../../store/chats/selectors";
import { selectMessages } from "../../store/messages/selector";
import { FormContainer } from "../Form/FormContaner";

function Chats() {

    const { chatId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const messages = useSelector(selectMessages);
    const chatsLength = useSelector(selectChatsLength);
    const firstChatId = useSelector(selectFirstChatId);

    const selectChatExists = useMemo(() => selectIfChatExists(chatId), [chatId]);
    const chatExists = useSelector(selectChatExists);

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
            <ChatList onDeleteChat={handleDeleteChat} />
            {!!chatId && chatExists &&
                <>
                    {
                        (Object.values(messages[chatId] || {}) || []).map((message) => (
                            <Message
                                key={message.id}
                                text={message.text}
                                id={message.id} />
                        ))
                    }
                    <FormContainer />
                </>
            }
        </div>
    );
}

export default Chats;
