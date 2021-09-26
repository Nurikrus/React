import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessageWithReply } from "../../store/messages/action";
import { AUTHORS } from "../../utils/constants";
import { FormView } from "./FormView";

export const FormContainer = () => {

    const dispatch = useDispatch();
    const { chatId } = useParams();

    const sendMessage = useCallback((text, author) => {
        dispatch(addMessageWithReply(chatId, text, author))
    }, [chatId, dispatch])    

    const inputRef = useRef(null);
    const [value, setValue] = useState("");

    const handleChange = useCallback((event) => setValue(event.target.value)
        , []);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(value, AUTHORS.HUMAN);
        setValue("");

        inputRef.current.focus();
    };

    return (
        <FormView 
        handleSubmit={handleSubmit} 
        value={value}  
        inputRef={inputRef}
        handleChange={handleChange}
        />
    )
}