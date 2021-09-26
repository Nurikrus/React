import { useCallback, useState } from "react";
import "./App.scss";
import { Routery } from "./components/Router";
import { ThemeContext } from "./utils/ThemeContext";
import { Provider } from 'react-redux'
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [theme, setTheme] = useState('light');

  const changeTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <ThemeContext.Provider value={{ theme, changeTheme }} >
          <Routery />
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;
