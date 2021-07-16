import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/Application/application-reducer'
import {authReducer} from '../features/Auth/auth-reducer'
import {loadState, saveState} from '../utils/localStorageUtils'
import throttle from 'lodash.throttle'
import {cardsReducer} from '../features/Cards/cards-reducer'

export type AppRootStateType = ReturnType<typeof store.getState>

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    cards: cardsReducer
})

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

store.subscribe(throttle(() => {
    saveState({
        cards: store.getState().cards,
    } as AppRootStateType)
}, 1000))

store.subscribe(() => {
    localStorage.setItem('token', JSON.stringify(store.getState().auth.token))
})

// @ts-ignore
window.store = store