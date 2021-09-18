import { useCallback, useState } from "react";
import "./App.scss";
import { Routery } from "./components/Router";
import { ThemeContext } from "./utils/ThemeContext";
import { Provider } from 'react-redux'
import { store } from "./store";

function App() {
  const [theme, setTheme] = useState('light');

  const changeTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <Routery />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
