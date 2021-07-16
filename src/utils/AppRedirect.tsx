import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../app/store'
import {Redirect} from 'react-router-dom'
import {PATH} from '../app/Pages'
import {tokenRefresh} from '../features/Auth/auth-reducer'

export const AppRedirect: React.FC = ({children}) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)
    const token = JSON.parse(localStorage.getItem('token') as string)
    const [first, setFirst] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (first && token && !isRegistered) {
            dispatch(tokenRefresh(token))
            setFirst(false)
        }
    }, [dispatch, first, token, isRegistered])

    if (isLogged) {
        return <Redirect to={PATH.APPLICATION}/>
    }
    return (
        <>
            {children}
        </>
    )
}