import {CardType, RowStatuses} from '../../api/API'
import {Row} from './Row'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {CardsStateType, getCards, updateCard} from './cards-reducer'
import {useHistory, useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/core'
import {AppRootStateType} from '../../app/store'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

type TitlesColor = {
    [key in RowsTitles]: string
}

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
})

export type RowsTitles = keyof typeof RowStatuses

const titlesColor: TitlesColor = {
    'NeedReview': '#E1C451',
    'InProgress': '#408FB7',
    'Approved': '#52B169',
    'OnHold': '#EC834F'
}

export const RowsList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const statuses = Object.keys(RowStatuses)
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards)
    const mappedCards = statuses.map((s: string, index) => <Row key={index} title={s as RowsTitles}
                                                                color={titlesColor[s as RowsTitles]}/>)

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const card: CardType | undefined = cards[result.source.droppableId].find(c => c.id === Number(result.draggableId))
        if (card) {
            dispatch(updateCard({
                data: {
                    id: card.id,
                    row: result.destination.droppableId as RowStatuses,
                    seq_num: card.seq_num,
                    text: card.text
                }, previouslyRow: result.source.droppableId
            }))
        }
    }

    return (
        <div className={classes.wrapper}>
            <DragDropContext onDragEnd={(result, provided) => onDragEnd(result)}>
                {mappedCards}
            </DragDropContext>
        </div>
    )
}