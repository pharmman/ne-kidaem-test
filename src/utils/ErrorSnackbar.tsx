import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../app/store'
import {AppErrorType, setAppError} from '../features/Application/application-reducer'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const appError = useSelector<AppRootStateType, AppErrorType>(state => state.app.error)
    const setAppErrorHandler = (error:AppErrorType) => dispatch(setAppError({error}))

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return
        setAppErrorHandler(null)
    }

    return (
        <div>
            <Snackbar open={appError !== null} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {appError}
                </Alert>
            </Snackbar>
        </div>
    )
}
