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

export const fetchTeachersQuestion = (payload) => ({
    type: types.FETCH_TEACHER_QUESTIONS,
    payload: {
        path: `question/all/${payload}`,
        method: 'GET',
    },
    meta: {
        api: true,
        successMessage: 'Question fetch successfully',
        errorMessage: "Question coudn't be fetch",
    },
});

export const fetchCourseQuestion = (payload) => ({
    type: types.FETCH_COURSES_QUESTIONS,
    payload: {
        path: `question/course/${payload}`,
        method: 'GET'
    },
    meta: {
        api: true,
        successMessage: 'Course question fetch successfully',
        errorMessage: "Course uestion coudn't be fetched",
    },
});