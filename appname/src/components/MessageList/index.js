import React, { useState } from "react";

export const MessageList = () => {
    const [author, setAuthor] = useState('');
    const [text, setComment] = useState('');
    const [message, setMessage] = useState([]);

    const authorChange = (event) => {
        setAuthor(event.target.value);
    }
    const commentChange = (event) => {
        setComment(event.target.value);
    }

    const sendMessage = () => {
        const newComment = [author, text, ','];
        const newMessage = [...message, newComment];
        setMessage(newMessage);
        console.log(message);
    }

    //const sendBot = () => {
    //    if (abc == []) {
    //        alert('Hello ' + author);
    //        abc = message.find((i) => i[0] != author);
    //        console.log(1);
    //    }
    //    else {
    //        if (abc != message.find((i) => i[0] != author)) {
    //            alert('Hello ' + author);
    //           abc = message.find((i) => i[0] != author);
    //            console.log(abc);
    //        }
    //    }
    //}

    return (
        <div>
            <form action='#' onSubmit={sendMessage}>
                <input type="text" value={author} onChange={authorChange} label='author' />
                <input type="text" value={text} onChange={commentChange} label='text' />
                <button /*onClick={sendBot}*/>Send Me</button>
            </form>
            <span>{message}</span>
        </div>
    )

};