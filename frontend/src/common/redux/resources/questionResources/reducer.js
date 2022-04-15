import produce from 'immer';
import * as types from './types';

const questionInfoState = {
    allQuestion: null,
    added: false,
}

export const questionInfo = (state = questionInfoState, action) => {
    const { type, payload } = action;
    return produce(state, (draft) => {
        switch (type) {
            case types.CREATE_QUESTION:
                break;
            case types.CREATE_QUESTION_SUCCESS:
                draft.added = true
                break;
            case types.CREATE_QUESTION_FAILED:
                break;
            default:
                return state;
        }
    });
}