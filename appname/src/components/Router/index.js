import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Chats from "../Chats";
import { Home } from "../Home";
import { Profile } from "../Profile";


export const Routery = () => {
    return (
        <BrowserRouter>
            <div className='App-header'>
                <Link to='/chats'>Chats</Link>
                <Link to='/'>Home page</Link>
                <Link to='/profile'>Profile</Link>
            </div>
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/chats/:chatId?' component={Chats}>
                    {/*<Chats />*/}
                </Route>
                <Route path='/profile'>
                    <Profile />
                </Route>
                <Route>
                    <h4>404 not found</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    )
};