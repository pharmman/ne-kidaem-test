import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../app/store'
import {Redirect} from 'react-router-dom'
import {PATH} from '../app/Pages'
import React, {useEffect, useState} from 'react'
import {tokenRefresh} from '../features/Auth/auth-reducer'

export const LoginRedirect: React.FC = ({children}) => {
    const [first, setFirst] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
    const token = JSON.parse(localStorage.getItem('token') as string)

    useEffect(() => {
        if (first) {
            dispatch(tokenRefresh(token))
            setFirst(false)
        } else {
            if (!isLogged) setRedirect(true)
        }
    }, [dispatch, first, token, redirect, isLogged])


    if (redirect) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <>
            {children}
        </>
    )
}