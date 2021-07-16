import axios from 'axios'

export enum RowStatuses {
    OnHold = '0',
    InProgress = '1',
    NeedReview = '2',
    Approved = '3'
}

interface LoginResponseData {
    username: string
    password: string
    token: string
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
    row: RowStatuses
    seq_num: number
    text: string
}

export interface CreateCardRequestData {
    row: RowStatuses,
    text: string
}

export type GetCardsRequestData = {
    row?: string
}

export const instance = axios.create({
    baseURL: 'https://trello.backend.tests.nekidaem.ru/api/v1/'
    // withCredentials: true
})

instance.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        const token = JSON.parse(localStorage.getItem('token') as string)
        config.headers.Authorization = token && `JWT ${token}`
    }
    return config
})


export const authAPI = {
    login(data: LoginRequestData) {
        return instance.post<LoginResponseData>('users/login/', data)
    },
    register(data: RegisterRequestData) {
        return instance.post<RegisterResponseData>('users/create/', data)
    },
    refreshToken(token: string) {
        return instance.post<{ token: string }>('users/refresh_token/', {token})
    }
}

export const cardsAPI = {
    getCards(data?: GetCardsRequestData) {
        return instance.get<CardType[]>('cards/', {
            params: {
                row: data && data.row
            }
        })
    },
    createCard(data: CreateCardRequestData) {
        return instance.post<CardType>('cards/', data)
    },
    updateCard(data: CardType) {
        return instance.patch<CardType>(`cards/${data.id}/`, {
            row: data.row,
            text: data.text,
            seq_num: data.seq_num
        } as CardType)
    },
    deleteCard(id: number) {
        return instance.delete(`cards/${id}/`)
    }
}
