import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI, LoginRegisterRequestData} from '../../api/API'
import {setAppError, setAppStatus} from '../Application/application-reducer'


export const login = createAsyncThunk('auth/login', async (data: LoginRegisterRequestData, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        let res = await authAPI.login(data)
        dispatch(setIsLogged({isLogged: true}))
        return {token: res.data.token}
    } catch (err) {
        dispatch(setAppError({error: 'Some error occurred'}))
        return rejectWithValue({errors: err.message})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const registration = createAsyncThunk('auth/registration', async (data: LoginRegisterRequestData, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        let res = await authAPI.register(data)
        dispatch(setIsRegistered({isRegistered: true}))
        return {token: res.data.token}
    } catch (err) {
        dispatch(setAppError({error: 'Some error occurred'}))
        return rejectWithValue(err)
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const tokenRefresh = createAsyncThunk('application/tokenRefresh', async (token: string, {
        dispatch,
        rejectWithValue,
        getState
    }) => {
        dispatch(setAppStatus({loading: true}))
        try {
            const res = await authAPI.refreshToken(token)
            dispatch(setIsLogged({isLogged: true}))
            return {token: res.data.token}
        } catch (err) {
            dispatch(setIsLogged({isLogged: false}))
            return rejectWithValue(err)
        } finally {
            dispatch(setAppStatus({loading: false}))
        }
    }
)


export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        isRegistered: false,
        token: ''
    },
    reducers: {
        setIsLogged: (state, action: PayloadAction<{ isLogged: boolean }>) => {
            state.isLogged = action.payload.isLogged
        },
        setIsRegistered: (state, action: PayloadAction<{ isRegistered: boolean }>) => {
            state.isRegistered = action.payload.isRegistered
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLogged = true
            state.token = action.payload.token
        })
            .addCase(registration.fulfilled, (state, action) => {
                state.token = action.payload.token
            })
            .addCase(tokenRefresh.fulfilled, (state, action) => {
                state.token = action.payload.token
            })
    }
})

export const authReducer = slice.reducer
export const {setIsLogged, setIsRegistered} = slice.actions





