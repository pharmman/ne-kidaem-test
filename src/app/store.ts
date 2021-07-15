import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/Application/application-reducer'
import {authReducer} from '../features/Auth/auth-reducer'
import {loadState, saveState} from '../utils/localStorageUtils'
import throttle from 'lodash.throttle'

export type AppRootStateType = ReturnType<typeof store.getState>

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

store.subscribe(throttle(() => {
    saveState(store.getState())
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
}, 1000))

// @ts-ignore
window.store = store