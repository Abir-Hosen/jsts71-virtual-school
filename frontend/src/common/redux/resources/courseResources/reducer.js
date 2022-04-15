import produce from 'immer';
import * as types from './types';

const courseInfoState = {
    allCourse: null,
    change: false,
    userCourse: null,
    teacherCourse: null,
    selectTeacherCourse: []
}

export const courseInfo = (state = courseInfoState, action) => {
    const { type, payload } = action;
    return produce(state, (draft) => {
        switch (type) {
            case types.SAVE_COURSE:
                break;
            case types.SAVE_COURSE_SUCCESS:
                draft.change = !state.change
                break;
            case types.SAVE_COURSE_FAILED:
                break;
            case types.FETCH_ALL_COURSE:
                break;
            case types.FETCH_ALL_COURSE_SUCCESS:
                draft.allCourse = payload
                break;
            case types.FETCH_ALL_COURSE_FAILED:
                break;
            case types.TAKE_COURSE:
                break;
            case types.TAKE_COURSE_SUCCESS:
                draft.change = !state.change
                break;
            case types.TAKE_COURSE_FAILED:
                break;
            case types.FETCH_USER_COURSE:
                break;
            case types.FETCH_USER_COURSE_SUCCESS:
                draft.userCourse = payload
                break;
            case types.FETCH_USER_COURSE_FAILED:
                break;
            case types.FETCH_TEACHER_COURSE:
                break;
            case types.FETCH_TEACHER_COURSE_SUCCESS:
                draft.teacherCourse = payload
                let data = []
                payload.forEach(async(element) => {
                    await data.push({ label: element.name, value: element.id })
                });
                draft.selectTeacherCourse = data
                break;
            case types.FETCH_TEACHER_COURSE_FAILED:
                break;
            default:
                return state;
        }
    });
}