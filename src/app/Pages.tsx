import {ReactNode} from 'react'
import {Redirect} from 'react-router-dom'
import {Login} from '../features/Auth/Login'
import {Registration} from '../features/Auth/Registration'
import {RowsList} from '../features/Cards/RowsList'
import {LoginRedirect} from '../utils/LoginRedirect'
import {AppRedirect} from '../utils/AppRedirect'

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
    REGISTRATION: '/registration',
    APPLICATION: '/application'

}

export const pages: PageType[] = [
    {_id: 0, title: 'main', path: '/', exact: true, page: <Redirect to={PATH.LOGIN}/>},
    {_id: 1, title: 'login', path: PATH.LOGIN, exact: true, page: <AppRedirect><Login/></AppRedirect>},
    {_id: 2, title: 'registration', path: PATH.REGISTRATION, exact: true, page: <Registration/>},
    {
        _id: 3,
        title: 'application',
        path: PATH.APPLICATION,
        exact: true,
        page: <LoginRedirect><RowsList/></LoginRedirect>
    }
]