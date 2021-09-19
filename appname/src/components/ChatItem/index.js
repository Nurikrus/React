import { ListItem } from "@material-ui/core";
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";

export const ChatItem = ({ chat, onDelete, id }) => {

    const handleDelete = () => {
        onDelete(id);
    }

    return (
        <ListItem className='chat_list' >
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
            <DeleteIcon onClick={handleDelete} />
        </ListItem>
    )
}

