import { List, Button, TextField } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, onAddChat } from "../../store/chats/action";
import { selectChats } from "../../store/chats/selectors";
import { ChatItem } from "../ChatItem";

export const ChatList = ({ onDeleteChat }) => {
    const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addChat(value));
        dispatch(onAddChat(value));

        setValue("");
    }

    return (
        <List>
            {chats.map((chat) => (
                <ChatItem
                    chat={chat}
                    key={chat.id}
                    id={chat.id}
                    onDelete={onDeleteChat} />
            ))}
            <form onSubmit={handleSubmit} >
                <TextField
                    type='text'
                    id="outlined-basic"
                    label="set name chat"
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                />
                <Button variant="contained" endIcon={<AddCircleIcon color='primary' />} disabled={!value} type='submit'>
                    Add Chat
                </Button>
            </form>
        </List>
    );
};