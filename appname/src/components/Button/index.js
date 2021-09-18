import { light } from "@material-ui/core/styles/createPalette";
import React, { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeContext";

import './style.scss';

export const Button = ({ children }) => {
    const theme = useContext(ThemeContext);
    return (
        <button className={`btn ${theme.theme === 'light' ? "btn_light" : 'btn_dark'}`} type='submit'>
            {children('text button')}
        </button>
    );
};