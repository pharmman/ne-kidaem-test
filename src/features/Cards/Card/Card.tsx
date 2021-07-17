import {Box, makeStyles} from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import {useDispatch} from 'react-redux'
import {deleteCard} from '../cards-reducer'

type CardProps = {
    id: number
    text: string
}

const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        minHeight: '80px',
        padding: '10px',
        margin: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#1E2021',
        color: '#919697',
        wordBreak: 'break-all'
    },
    id: {
        color: '#FFF'
    },
    firstLine: {
        display: 'inline-block',
        marginBottom: theme.spacing(1)
    },
    deleteIcon: {
        '&:hover': {
            color: '#FFF'
        },
        cursor: 'pointer'
    }
}))


export const Card: React.FC<CardProps> = ({id, text}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const removeCard = () => dispatch(deleteCard(id))

    return (
        <Box className={classes.cardWrapper}>
            <Box>
                <span className={classes.firstLine}><b className={classes.id}>id: </b>{id}</span><br/>
                <span>{text}</span>
            </Box>
            <Box>
                <CloseIcon className={classes.deleteIcon} onClick={removeCard} fontSize={'small'}/>
            </Box>
        </Box>
    )
}