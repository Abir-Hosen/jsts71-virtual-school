import produce from 'immer';
import * as types from './types';

const authInfoState = {
    userInfo: null,
    role: 'none'
}

export const authInfo = (state = authInfoState, action) => {
    const { type, payload } = action;
    return produce(state, (draft) => {
        switch (type) {
            case types.SIGN_IN:
                break;
            case types.SIGN_IN_SUCCESS:
                draft.userInfo = payload
                draft.role = payload.user_data ? payload.user_data.role : 'none'
                break;
            case types.SIGN_IN_FAILED:
                break;
            case types.VALIDATE_TOKEN:
                break;
            case types.VALIDATE_TOKEN_SUCCESS:
                draft.userInfo = payload
                draft.role = payload.user_data ? payload.user_data.role : 'none'
                break;
            case types.VALIDATE_TOKEN_FAILED:
                break;
            default:
                return state;
        }
    });
}