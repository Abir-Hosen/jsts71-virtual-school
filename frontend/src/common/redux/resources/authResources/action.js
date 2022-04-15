import * as types from './types';


export const signIn = (payload) => ({
    type: types.SIGN_IN,
    payload: {
        path: `user/sign_in`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'User sign in successfully',
        errorMessage: "User coudn't sign in",
    },
});

export const validateToken = (payload) => ({
    type: types.VALIDATE_TOKEN,
    payload: {
        path: `user/check_token`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'Token is valid',
        errorMessage: "Token is not valid",
    },
});

export const saveAuthUser = (payload) => ({
    type: types.SAVE_USER_INFO,
    payload: payload,
    meta: {
        api: false,
        successMessage: 'User connected successfully',
        errorMessage: "User coudn't connect",
    },
});


export const clearState = () => ({
    type: 'RESET_APP',
    meta: {
        api: false,
        successMessage: 'Successfully State Clear',
        errorMessage: "State not clear",
    },
});