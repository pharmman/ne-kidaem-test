import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {cardsAPI, CardType, CreateCardRequestData, GetCardsRequestData, RowStatuses} from '../../api/API'
import {setAppError, setAppStatus} from '../Application/application-reducer'

export type CardsStateType = {
    [key: string]: CardType[]
}

export const getCards = createAsyncThunk('cards/getCards', async (params: { data: GetCardsRequestData } | undefined, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        const res = await cardsAPI.getCards(params && params.data)
        return {cards: res.data}
    } catch (err) {
        console.log(err.payload.data.detail)
        dispatch(setAppError(err.payload.data.detail))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const createCard = createAsyncThunk('cards/createCard', async (data: CreateCardRequestData, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        const res = await cardsAPI.createCard(data)
        return {card: res.data}
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const deleteCard = createAsyncThunk('cards/deleteCard', async (id: number, {dispatch, rejectWithValue}) => {
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

export const updateCard = createAsyncThunk('cards/updateCard', async (param: { data: CardType, previouslyRow: string }, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        const res = await cardsAPI.updateCard(param.data)
        return {card: res.data, previouslyRow: param.previouslyRow}
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})


const slice = createSlice({
    name: 'cards',
    initialState: {} as CardsStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            Object.values(RowStatuses).forEach(r => {
                state[r] = action.payload.cards.filter(c => c.row === r)
            })
        })
            .addCase(createCard.fulfilled, (state, action) => {
                state[action.payload.card.row].push(action.payload.card)
            })
            .addCase(updateCard.pending, (state, action) => {

            })
            .addCase(updateCard.fulfilled, (state, action) => {
                const index = state[action.payload.previouslyRow].findIndex(c => c.id === action.payload.card.id)
                state[action.payload.previouslyRow].splice(index, 1)
                state[action.payload.card.row].splice(action.payload.card.seq_num, 0, action.payload.card)
            })
    }
})

export const cardsReducer = slice.reducer