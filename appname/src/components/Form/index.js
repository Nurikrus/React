import { TextField } from "@material-ui/core";
import React, { useCallback, useRef, useState } from "react";

export const Form = ({ onSubmit }) => {


    const inputRef = useRef(null);
    const [value, setValue] = useState("");

    const handleChange = useCallback((event) => setValue(event.target.value)
        , []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
        setValue("");

        inputRef.current.focus();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                placeholder="message"
                label="введите сообщение"
                value={value}
                onChange={handleChange}
                inputRef={inputRef}
            />
            <button>Add message</button>
        </form>
    )
}