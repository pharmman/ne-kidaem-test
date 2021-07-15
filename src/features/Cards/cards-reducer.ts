import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CardType, GetCardsRequestData} from '../../api/API'

export const getCards = createAsyncThunk('cards/getCards', async (data:GetCardsRequestData, {dispatch, rejectWithValue}) => {
    dispatch()
})


const slice = createSlice({
    name: 'cards',
    initialState: [] as CardType[],
    reducers: {},
    extraReducers: {}
})