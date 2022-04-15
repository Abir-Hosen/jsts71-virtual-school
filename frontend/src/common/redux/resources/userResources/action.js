import * as types from './types';



export const saveUser = (payload) => ({
    type: types.SAVE_USER,
    payload: {
        path: `user/sign_up`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'User saved successfully',
        errorMessage: "User coudn't save",
    },
});


export const deleteUser = (payload) => ({
    type: types.DELETE_USER,
    payload: {
        path: `user/delete_profile/${payload}`,
        method: 'DELETE',
    },
    meta: {
        api: true,
        successMessage: 'User deleted successfully',
        errorMessage: "User coudn't be deleted",
    },
});


export const fetchAllUser = () => ({
    type: types.FETCH_ALL_USER,
    payload: {
        path: `user/get_all`,
        method: 'GET',
    },
    meta: {
        api: true,
        successMessage: 'User fetch successfully',
        errorMessage: "User coudn't fetch",
    },
});

export const updateUser = (payload) => ({
    type: types.UPDATE_USER,
    payload: {
        path: `user/update_profile`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'User updated successfully',
        errorMessage: "User coudn't update",
    },
});

export const updatePassword = (payload) => ({
    type: types.UPDATE_PASSWORD,
    payload: {
        path: `user/update_password`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'User password updated successfully',
        errorMessage: "User password coudn't update",
    },
});