import { useState, useEffect, useCallback } from "react";
import { Message } from "../Message";
import { Form } from "../Form";
import { AUTHORS } from "../../utils/constants";
import { ChatList } from "../Chat";
import { useParams } from "react-router-dom";

const initialMessages = {
    'chat-1': [
        { text: "123", author: "HUMAN", id: "mess-1" },
        { text: "321", author: "HUMAN", id: "mess-2" },
    ],
    'chat-2': [],
};
const initialChats = [
    { name: 'chat1', id: 'chat-1' },
    { name: 'chat2', id: 'chat-2' },
];

function Chats() {

    const { chatId } = useParams();
    const [messages, setMessages] = useState(initialMessages);
    const [chats, setChats] = useState(initialChats);

    useEffect(() => {
        let timeOut;

        if (!!chatId && messages[chatId][messages[chatId].length - 1]?.author === AUTHORS.HUMAN) {
            timeOut = setTimeout(() => {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [chatId]: [
                        ...prevMessages[chatId],
                        { text: "I am bot", author: AUTHORS.BOT, id: `mess-${Date.now()}` },
                    ]
                }));
            }, 1000);
        }

        return () => clearTimeout(timeOut);
    }, [messages, chatId]);

    const handleAddMessage = useCallback((text) => {
        setMessages((prevMess) => ({
            ...prevMess,
            [chatId]: [
                ...prevMess[chatId], {
                    text,
                    author: AUTHORS.HUMAN,
                    id: `mess-${Date.now()}`
                }]
        }))
    }, [chatId]);

    return (
        <div className="App">
            <ChatList chats={chats} />
            {!!chatId &&
                <>
                    {
                        messages[chatId].map((message, i) => (
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
