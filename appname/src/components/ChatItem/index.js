import { ListItem } from "@material-ui/core";
import { Link } from 'react-router-dom';
import React from "react";
import { useSelector } from "react-redux";

export const ChatItem = ({ chat }) => {
    const showName = useSelector((state) => state.showName);
    console.log(showName);
    return (
        <ListItem className='chat_list' >
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
        </ListItem>
    )
}

