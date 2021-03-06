import {CardType, RowStatuses} from '../../api/API'
import {Row} from './Row'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {CardsStateType, getCards, updateCard} from './cards-reducer'
import {Box, Button, makeStyles} from '@material-ui/core'
import {AppRootStateType} from '../../app/store'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../app/Pages'

type TitlesColor = {
    [key in RowsTitles]: string
}

export type RowsTitles = keyof typeof RowStatuses

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: 'var(--main-bg-color)',
        '@media (max-width:580px)': {
            flexDirection: 'column',
            alignContent: 'center'
        }
    },
    logoutButton: {
        position: 'absolute',
        bottom: '0',
        right: '0'
    }
})

const titlesColor: TitlesColor = {
    'NeedReview': '#E1C451',
    'InProgress': '#408FB7',
    'Approved': '#52B169',
    'OnHold': '#EC834F'
}

export const RowsList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const logoutHandler = () => setRedirect(true)

    //rows names
    const statuses = Object.keys(RowStatuses)

    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards)
    const mappedRows = statuses.map((s: string, index) => <Row key={index} title={s as RowsTitles}
                                                               color={titlesColor[s as RowsTitles]}/>)

    //didn't make request if cards already in state
    useEffect(() => {
        if (Object.keys(cards).length === 0) {
            dispatch(getCards())
        }
    }, [dispatch, cards])

    if (redirect) return <Redirect to={PATH.LOGIN}/>

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const card: CardType | undefined = cards[result.source.droppableId as RowStatuses].find(c => c.id === Number(result.draggableId))
        if (card) {
            dispatch(updateCard({
                data: {
                    id: card.id,
                    row: result.destination.droppableId as RowStatuses,
                    seq_num: result.destination.index,
                    text: card.text
                }, previouslyRow: result.source.droppableId,
                previouslySeqNum: result.source.index
            }))
        }
    }

    return (
        <Box className={classes.wrapper}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                {mappedRows}
            </DragDropContext>
            <Button className={classes.logoutButton} onClick={logoutHandler}>Log Out</Button>
        </Box>
    )
}