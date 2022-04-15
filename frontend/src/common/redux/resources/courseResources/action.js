import * as types from './types';

export const saveCourse = (payload) => ({
    type: types.SAVE_COURSE,
    payload: {
        path: `course/save_course`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'Course save successfully',
        errorMessage: "Course coudn't saved",
    },
});

export const fetchAllCourse = () => ({
    type: types.FETCH_ALL_COURSE,
    payload: {
        path: `course/fetch_all_course`,
        method: 'GET',
    },
    meta: {
        api: true,
        successMessage: 'Course fetch successfully',
        errorMessage: "Course coudn't be fetched",
    },
});

export const takeCourse = (payload) => ({
    type: types.TAKE_COURSE,
    payload: {
        path: `course/take_course`,
        method: 'POST',
        data: payload
    },
    meta: {
        api: true,
        successMessage: 'Course taken successfully',
        errorMessage: "Course coudn't be taken",
    },
});

export const fetchUserCourses = (payload) => ({
    type: types.FETCH_USER_COURSE,
    payload: {
        path: `course/fetch_course_by_user/${payload}`,
        method: 'GET'
    },
    meta: {
        api: true,
        successMessage: 'User course fetch successfully',
        errorMessage: "User course coudn't be fetched",
    },
});

export const fetchTeacherCourses = (payload) => ({
    type: types.FETCH_TEACHER_COURSE,
    payload: {
        path: `course/fetch_teacher_course/${payload}`,
        method: 'GET'
    },
    meta: {
        api: true,
        successMessage: 'Teacher course fetch successfully',
        errorMessage: "Teacher course coudn't be fetched",
    },
});