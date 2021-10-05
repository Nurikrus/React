import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { getAuthLogin } from "../../store/Auth/actoin";
import { selectAuth } from "../../store/Auth/selectors";
import Chats from "../Chats";
import { auth, login, signOut, signUp } from "../Firebase";
import { Home } from "../Home";
import { News } from "../News";
import { PrivateRoute } from "../PrivateRoute";
import { Profile } from "../Profile";
import { PublicRoute } from "../PublicRoute";


export const Routery = () => {
    const authed = useSelector(selectAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                dispatch(getAuthLogin(true));
            } else {
                dispatch(getAuthLogin(false));
            }
        });

        return unsubscribe;
    }, [dispatch]);

    const handlelogin = async (email, pass) => {
        try {
            await login(email, pass);
        } catch (e) {
            console.log(e);
        }
    };

    const handlesignup = async (email, pass) => {
        try {
            await signUp(email, pass);
        } catch (e) {
            console.log(e);
        }
    };

    const handleLoguot = async () => {
        try {
            await signOut();
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <BrowserRouter>
            <div className='App-header'>
                <Link to='/chats'>Chats</Link>
                {!authed && <Link to='/'>Home page</Link>}
                <Link to='/profile'>Profile</Link>
                <Link to='/news'>Api</Link>
            </div>
            <Switch>
                <PublicRoute path='/' exact authed={authed}>
                    <Home onSignup={handlesignup} />
                </PublicRoute>
                <PublicRoute path='/login' exact authed={authed}>
                    <Home onLogin={handlelogin} />
                </PublicRoute>
                <PrivateRoute path='/chats/:chatId?' component={Chats} authed={authed} />
                <PrivateRoute path='/profile' exact authed={authed} >
                    <Profile onLoguot={handleLoguot} />
                </PrivateRoute>
                <Route path='/news' component={News} />
                <Route>
                    <h4>404 not found</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    )
};