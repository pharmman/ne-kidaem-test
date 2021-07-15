import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI, LoginRequestData, RegisterRequestData} from '../../api/API'
import {AppRootStateType} from '../../app/store'
import {setAppStatus} from '../Application/application-reducer'


export const login = createAsyncThunk('auth/login', async (data: LoginRequestData, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        let res = await authAPI.login(data)
        return {token: res.data.token}
    } catch (err) {
        console.log(err[1])
        return rejectWithValue({errors: err.message})
    } finally {
        dispatch(setAppStatus({loading: true}))
    }
})

export const registration = createAsyncThunk('auth/registration', async (data: RegisterRequestData, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        let res = await authAPI.register(data)
        return {token: res.data.token}
    } catch (err) {
        return rejectWithValue({errors: err.message})
    } finally {
        dispatch(setAppStatus({loading: true}))
    }
})

export const initializeApp = createAsyncThunk('application/initializeApp', async (params, {
        dispatch,
        rejectWithValue,
        getState
    }) => {
        dispatch(setAppStatus({loading: true}))
        const state = getState() as AppRootStateType
        const token = state.auth.token
        try {
            await authAPI.refreshToken(token)
        } catch (err) {
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
        token: ''
    },
    reducers: {
        setIsLogged: (state, action: PayloadAction<{ isLogged: boolean }>) => {
            state.isLogged = action.payload.isLogged
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLogged = true
            state.token = action.payload.token as string
        })
            .addCase(registration.fulfilled, (state, action) => {
                state.token = action.payload.token as string
            })
    }
})

export const authReducer = slice.reducer





