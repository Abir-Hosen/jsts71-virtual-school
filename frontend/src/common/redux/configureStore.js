import { applyMiddleware, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
// Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
// The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. 
import thunkMiddleware from 'redux-thunk'
// Redux DevTools for debugging application's state changes. The extension provides power-ups for your Redux development workflow.
import { composeWithDevTools } from 'redux-devtools-extension'

import { loggerMiddleware, apiMiddleware } from './middlewares'
// import loggerMiddleware from './middlewares/loggerMiddleware'
// import apiMiddleware from './middlewares/apiMiddleware'
import { monitorReducerEnhancer } from './enhencers'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['serverConfig']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(preloadedState) {

    const middlewares = [loggerMiddleware, thunkMiddleware, apiMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(persistedReducer, preloadedState, composedEnhancers)
    
    return store
}