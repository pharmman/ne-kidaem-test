import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    cardsAPI,
    CardType,
    CreateCardRequestData,
    CreateUpdateDeleteCardResponseRequestData,
    GetCardsRequestData
} from '../../api/API'
import {setAppError, setAppStatus} from '../Application/application-reducer'

export const getCards = createAsyncThunk('cards/getCards', async (params:{data:GetCardsRequestData} | undefined, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        const res = await cardsAPI.getCards(params && params.data)
        return {cards: res.data}
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

//TODO проверить getCards
export const createCard = createAsyncThunk('cards/createCard', async (data:CreateCardRequestData, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        await cardsAPI.createCard(data)
        dispatch(getCards())
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const deleteCard = createAsyncThunk('cards/deleteCard', async (id:string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        await cardsAPI.deleteCard(id)
        dispatch(getCards())
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const updateCard = createAsyncThunk('cards/updateCard', async (data:CreateUpdateDeleteCardResponseRequestData, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        await cardsAPI.updateCard(data)
        dispatch(getCards())
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})


const slice = createSlice({
    name: 'cards',
    initialState: [] as CardType[],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled,(state, action) => {
            return action.payload.cards
        })
    }
})

export const cardsReducer = slice.reducer