import * as types from './types';

export const saveQuestion = (payload) => ({
    type: types.CREATE_QUESTION,
    payload: {
        path: `question/create`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'Question save successfully',
        errorMessage: "Question coudn't be saved",
    },
});