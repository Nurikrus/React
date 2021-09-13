import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.scss";
import { Message } from "./components/Message";
import { Form } from "./components/Form";
import { AUTHORS } from "./utils/constants";
import { ChatList } from "./components/Chat";

const initialMessages = [
  { text: "123", author: "HUMAN", id: "mess-1" },
  { text: "321", author: "HUMAN", id: "mess-2" },
];
const initialChats = [
  { name: 'chat1', id: 'chat-1' },
  { name: 'chat2', id: 'chat-2' },
];

function App() {

  const [messages, setMessages] = useState(initialMessages);
  const [chats, setChats] = useState(initialChats);

  const messagesToShow = useMemo(() => {
    console.log("filtering...");
    return messages.filter(({ text }) => text.includes(""));
  }, [messages]);

  useEffect(() => {
    let timeOut;

    if (messages[messages.length - 1]?.author === AUTHORS.HUMAN) {
      timeOut = setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "I am bot", author: AUTHORS.BOT, id: `mess-${Date.now()}` },
        ]);
      }, 1000);
    }

    return () => clearTimeout(timeOut);
  }, [messages]);

  const handleAddMessage = useCallback((text) => {
    setMessages(prevMess => [...prevMess, {
      text,
      author: AUTHORS.HUMAN,
      id: `mess-${Date.now()}`
    }])
  }, []);

  return (
    <div className="App">
      <ChatList chats={chats} />
      {messagesToShow.map((message, i) => (
        <Message
          key={message.id}
          text={message.text}
          id={message.id}
        />
      ))}
      <Form onSubmit={handleAddMessage} />
    </div>
  );
}

export default App;
