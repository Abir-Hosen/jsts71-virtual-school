import produce from 'immer';
import * as types from './types';

const userInfoState = {
    allUser: null,
    change: true,
    success_message: '',
    error_message: ''
}

export const userInfo = (state = userInfoState, action) => {
    const { type, payload, successMessage, errorMessage } = action;
    return produce(state, (draft) => {
        switch (type) {

            case types.SAVE_USER:
                break;
            case types.SAVE_USER_SUCCESS:
                draft.success_message = successMessage
                break;
            case types.SAVE_USER_FAILED:
                draft.error_message = errorMessage
                break;

            case types.FETCH_ALL_USER:
                break;
            case types.FETCH_ALL_USER_SUCCESS:
                draft.allUser = payload
                break;
            case types.FETCH_ALL_USER_FAILED:
                draft.allUser = { data: [], total: 0 }
                    // draft.allUser = payload
                break;
            case types.UPDATE_USER:
                break;
            case types.UPDATE_USER_SUCCESS:
                draft.success_message = successMessage
                draft.change = !state.change
                break;
            case types.UPDATE_USER_FAILED:
                draft.error_message = errorMessage
                break;

            case types.DELETE_USER:
                break;
            case types.DELETE_USER_SUCCESS:
                draft.change = !state.change
                draft.success_message = successMessage
                break;
            case types.DELETE_USER_FAILED:
                draft.error_message = errorMessage
                break;

            case types.UPDATE_PASSWORD:
                break;
            case types.UPDATE_PASSWORD_SUCCESS:
                draft.success_message = successMessage
                break;
            case types.UPDATE_PASSWORD_FAILED:
                draft.error_message = errorMessage
                break;
            default:
                return state;
        }
    });
}