import React from "react";

export const SimpleText = (props) => {
    console.log(props);

    return <h3>HELLO React, {props.name}</h3>;
};