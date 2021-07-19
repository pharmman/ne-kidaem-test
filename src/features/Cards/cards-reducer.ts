import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {cardsAPI, CardType, CreateCardRequestData, RowStatuses} from '../../api/API'
import {setAppError, setAppStatus} from '../Application/application-reducer'
import {logout} from '../Auth/auth-reducer'

export type CardsStateType = {
    [value in RowStatuses]: CardType[]
}

//thunks
export const getCards = createAsyncThunk('cards/getCards', async (param: { row?: RowStatuses } | undefined, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        const res = await cardsAPI.getCards(param && param.row)
        return {cards: res.data}
    } catch (err) {
        dispatch(setAppError({error: 'Some error occurred'}))
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
        dispatch(setAppError({error: 'Some error occurred'}))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const deleteCard = createAsyncThunk('cards/deleteCard', async (param: { id: number }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        await cardsAPI.deleteCard(param.id)
        dispatch(getCards())
    } catch (err) {
        dispatch(setAppError({error: 'Some error occurred'}))
        return rejectWithValue({})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

export const updateCard = createAsyncThunk('cards/updateCard', async (param: { data: CardType, previouslyRow: string, previouslySeqNum: number }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({loading: true}))
    try {
        const res = await cardsAPI.updateCard(param.data)
        return {card: res.data, previouslyRow: param.previouslyRow}
    } catch (err) {
        dispatch(setAppError(err))
        return rejectWithValue({card: param.data, previouslyRow: param.previouslyRow})
    } finally {
        dispatch(setAppStatus({loading: false}))
    }
})

//!!!UpdateCard if connection lost card will be on start position
const slice = createSlice({
    name: 'cards',
    initialState: {} as CardsStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            Object.values(RowStatuses).forEach(r => {
                state[r] = action.payload.cards.filter(c => c.row === r)
            })
        }).addCase(logout, state => {
            return {} as CardsStateType
        })
            .addCase(createCard.fulfilled, (state, action) => {
                state[action.payload.card.row].push(action.payload.card)
            })
            .addCase(updateCard.pending, (state, action) => {
                state[action.meta.arg.previouslyRow as RowStatuses].splice(action.meta.arg.previouslySeqNum, 1)
                state[action.meta.arg.data.row].splice(action.meta.arg.data.seq_num, 0, action.meta.arg.data)
            })
            .addCase(updateCard.rejected, (state, action) => {
                state[action.meta.arg.data.row].splice(action.meta.arg.data.seq_num, 1)
                state[action.meta.arg.previouslyRow as RowStatuses].splice(action.meta.arg.previouslySeqNum, 0, action.meta.arg.data)
            })
    }
})

export const cardsReducer = slice.reducer
