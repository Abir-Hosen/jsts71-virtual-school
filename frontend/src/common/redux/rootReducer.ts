import { combineReducers } from 'redux';
import { userInfo } from './resources/userResources';
import { authInfo } from './resources/authResources';
import { courseInfo } from './resources/courseResources';
import { questionInfo } from './resources/questionResources';

const rootReducer = combineReducers({
    authInfo,
    userInfo,
    courseInfo,
    questionInfo
});

export default (state:any, action:any) => {
    if (action.type === 'RESET_APP') {
        state = undefined;
    }
    return rootReducer(state, action);
};