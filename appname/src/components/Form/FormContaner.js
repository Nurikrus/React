import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { initChats } from "../../store/chats/action";
import { addMessageFb, addMessageWithReply, initMessages } from "../../store/messages/action";
import { AUTHORS } from "../../utils/constants";
import { FormView } from "./FormView";

export const FormContainer = () => {

    const dispatch = useDispatch();
    const { chatId } = useParams();

    useEffect(() => {
        dispatch(initChats());
        dispatch(initMessages());
    }, [dispatch]);

    const sendMessage = useCallback((text, author) => {
        dispatch(addMessageWithReply(chatId, text, author));
        dispatch(addMessageFb(text, author, chatId));
    }, [chatId, dispatch])

    const inputRef = useRef(null);
    const [value, setValue] = useState("");

    const handleChange = useCallback((event) => setValue(event.target.value)
        , []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        sendMessage(value, AUTHORS.HUMAN);
        setValue("");

        inputRef.current.focus();
    }, [sendMessage, value]);

    return (
        <FormView
            handleSubmit={handleSubmit}
            value={value}
            inputRef={inputRef}
            handleChange={handleChange}
        />
    )
}