import axios from 'axios'
import {store} from '../app/store'

export enum TaskStatuses {
    OnHold = '0',
    InProgress = '1',
    NeedReview = '2',
    Approved = '3'
}

interface LoginResponseData {
    username: string
    password: string
    token?: string
}

export interface LoginRequestData {
    username: string
    password: string
}

export interface RegisterRequestData extends LoginRequestData {
    email?: string,
}

interface RegisterResponseData extends LoginResponseData {
    email?: string
}

export type CardType = {
    id: number
    row: string
    seq_num: number
    text: string
}

interface CreateCardRequestData {
    row: TaskStatuses,
    text: string
}

interface CreateUpdateDeleteCardResponseRequestData extends CreateCardRequestData {
    id?: number,
    seq_num: number,
}

export type GetCardsRequestData = {
    row?:string
}

export const instance = axios.create({
    baseURL: 'https://trello.backend.tests.nekidaem.ru/api/v1/',
    withCredentials: true
})

axios.interceptors.request.use(function (instance) {
    const token = store.getState().auth.token
    instance.headers.Authorization = token

    return instance
})


export const authAPI = {
    login(data: LoginRequestData) {
        return instance.post<LoginResponseData>('users/login/', data)
    },
    register(data: RegisterRequestData) {
        return instance.post<RegisterResponseData>('users/create/', data)
    },
    refreshToken(token: string) {
        return instance.post<{ token: string }>('users/refresh_token/', token)
    }
}

const CardsAPI = {
    getCards(data: GetCardsRequestData) {
        return instance.get<CardType[]>('cards/', {
            params: {
                row
            }
        })
    },
    createCard(data: CreateCardRequestData) {
        return instance.post<CreateUpdateDeleteCardResponseRequestData>('cards/', data)
    },
    updateCard(data: CreateUpdateDeleteCardResponseRequestData) {
        return instance.patch<CreateUpdateDeleteCardResponseRequestData>(`cards/${data.id}`, {
            row: data.row,
            text: data.text,
            seq_num: data.seq_num
        } as CreateUpdateDeleteCardResponseRequestData)
    },
    deleteCard(id: string) {
        return instance.delete(`cards/${id}`)
    }
}
