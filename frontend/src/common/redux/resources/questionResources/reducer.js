import produce from 'immer';
import * as types from './types';

const questionInfoState = {
    allQuestion: null,
    added: false,
    courseQuestions: null,
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
            case types.FETCH_TEACHER_QUESTIONS:
                break;
            case types.FETCH_TEACHER_QUESTIONS_SUCCESS:
                draft.allQuestion = payload
                break;
            case types.FETCH_TEACHER_QUESTIONS_FAILED:
                break;


            case types.FETCH_COURSES_QUESTIONS:
                break;
            case types.FETCH_COURSES_QUESTIONS_SUCCESS:
                draft.courseQuestions = payload
                break;
            case types.FETCH_COURSES_QUESTIONS_FAILED:
                break;
            default:
                return state;
        }
    });
}