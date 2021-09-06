import './App.css';
import { SimpleText } from './components/SimpleText';
import { Message } from './components/Message';
import { MessageList } from './components/MessageList';
//import { useEffect } from 'react';

function App() {

  //useEffect(() => {
  //  if (messages[messages.length - 1]?.author === "HUMAN") {
  //    setMessages((prevMessages) => [
  //      ...prevMessages,
  //      { text: "I am bot", author: "bot", id: `mess-${Date.now()}` },
  //     ]);
  //    inputRef.current.focus();
  //  }
  //}, [messages]);

  return (
    <div className="App">
      <SimpleText name="alex" />
      <Message />
      <MessageList />
    </div>
  );
}

export default App;
