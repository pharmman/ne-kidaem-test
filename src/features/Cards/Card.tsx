import {makeStyles} from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'

type CardProps = {
    id: number
    text: string
}

const useStyles = makeStyles({
    cardWrapper: {
        backgroundColor: '#1E2021',
        maxWidth: '300px',
        padding: '5px'
    }
})


export const Card: React.FC<CardProps> = ({id, text}) => {
    const classes = useStyles()
    return (
        <div className={classes.cardWrapper}>
            <div>
                <p><b>id: </b>{id}</p>
                <p>{text}</p>
            </div>
            <div>
                <CloseIcon fontSize={'small'}/>
            </div>
        </div>
    )
}