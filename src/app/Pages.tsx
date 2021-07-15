import {ReactNode} from 'react'
import { Redirect } from 'react-router-dom';
import {Login} from '../features/Auth/Login'

export type PageType = {
    _id: number;
    title: string;
    path?: string;
    params?: string;
    exact?: boolean;
    page: ReactNode;
};

export const PATH = {
    LOGIN: '/login',

}

export const pages: PageType[] = [
    {_id: 0, title: 'main', path: '/', exact: true, page: <Redirect to={PATH.LOGIN}/>},
    {_id: 1, title: 'login', path: PATH.LOGIN, exact: true, page: <Login/>},
]