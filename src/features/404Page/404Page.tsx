import React from 'react'
import travoltaGif from '../../assets/images/404.gif'
import {makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--main-bg-color)',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '100px',
        color: '#FFF'
    }
}))

export const ErrorPage = () => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
                <Typography variant={'h1'}>Looks like you got lost.</Typography>
                <div>
                    <img src={travoltaGif} alt="Travolta looks around"/>
                </div>
        </div>
    )
}

