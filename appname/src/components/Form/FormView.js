import { TextField } from "@material-ui/core";
import React from "react";
import { Button } from "../Button";

export const FormView = ({ handleSubmit, value, inputRef, handleChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                placeholder="message"
                label="введите сообщение"
                value={value}
                onChange={handleChange}
                inputRef={inputRef}
            />
            <Button children='Add message' />
        </form>
    )
};