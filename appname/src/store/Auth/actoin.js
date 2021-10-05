export const GET_SIGNUP = 'AUTH::GET_SIGNUP';
export const GET_LOGIN = 'AUTH::GET_LOGIN';
export const GET_LOGOUT = 'AUTH::GET_LOGOUT';

export const getAuthSignUp = (auth) => ({
    type: GET_SIGNUP,
    payload: auth
});

export const getAuthLogin = (auth) => ({
    type: GET_LOGIN,
    payload: auth
});

export const getAuthLogout = (auth) => ({
    type: GET_LOGOUT,
    payload: auth
});

