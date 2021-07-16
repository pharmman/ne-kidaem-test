import {makeStyles} from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import {useDispatch} from 'react-redux'
import {deleteCard} from '../cards-reducer'

type CardProps = {
    id: number
    text: string
}

const useStyles = makeStyles({
    cardWrapper: {
        backgroundColor: '#1E2021',
        maxWidth: '300px',
        padding: '5px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    }
})


export const Card: React.FC<CardProps> = ({id, text}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const removeCard = () => {
        dispatch(deleteCard(id))
    }
    return (
        <div className={classes.cardWrapper}>
            <div>
                <p><b>id: </b>{id}</p>
                <p>{text}</p>
            </div>
            <div>
                <CloseIcon onClick={removeCard} fontSize={'small'}/>
            </div>
        </div>
    )
}