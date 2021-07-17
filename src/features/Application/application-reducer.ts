import {createAction, createSlice} from '@reduxjs/toolkit'

export type AppErrorType = null | string
export type appReducerInitialState = typeof initialState

const initialState = {
    loading: false,
    error: null as AppErrorType,
}

export const setAppStatus = createAction<{ loading: boolean }>('app/setAppStatus')
export const setAppError = createAction<{ error: AppErrorType }>('app/setAppError')

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
            builder.addCase(setAppStatus, (state, action) => {
                state.loading = action.payload.loading
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export const appReducer = slice.reducer

