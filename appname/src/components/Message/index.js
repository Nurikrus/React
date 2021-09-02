import React from "react";

export const Message = (props) => {
    const showMes = () => {
        alert('You tuch me!!!');
    };
    return <button onClick={showMes}>Touch Me</button>;
};