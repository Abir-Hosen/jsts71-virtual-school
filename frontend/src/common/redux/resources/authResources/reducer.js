import produce from 'immer';
import * as types from './types';

const authInfoState = {
    userInfo: null,
}

export const authInfo = (state = authInfoState, action) => {
    const { type, payload } = action;
    return produce(state, (draft) => {
        switch (type) {
            case types.SIGN_IN:
                break;
            case types.SIGN_IN_SUCCESS:
                draft.userInfo = payload
                break;
            case types.SIGN_IN_FAILED:
                break;
            default:
                return state;
        }
    });
}