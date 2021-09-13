import { List, ListItem } from "@material-ui/core";
import { Link } from 'react-router-dom';
import React from "react";

export const ChatList = ({ chats }) => {
    return (<List>
        {chats.map((chat) => (
            <ListItem key={chat.id} className='chat_list' >
                <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
            </ListItem>
        ))}
    </List>
    );
};