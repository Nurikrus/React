import React, { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeContext";

import './style.scss';

export const Button = ({ children }) => {
    const theme = useContext(ThemeContext);
    return (
        <button className={`btn ${theme.theme === 'light' ? "btn_light" : 'btn_dark'}`} >
            {children}
        </button>
    );
};