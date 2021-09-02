import logo from './logo.svg';
import './App.css';
import { SimpleText } from './components/SimpleText';
import { Message } from './components/Message';

function App() {
  return (
    <div className="App">
      <SimpleText name="alex" />
      <Message />
    </div>
  );
}

export default App;
