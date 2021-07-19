import {CardType, RowStatuses} from '../../api/API'
import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import {CreateCard} from './Card/CreateCard'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {RowsTitles} from './RowsList'
import {Card} from './Card/Card'
import {Draggable, Droppable} from 'react-beautiful-dnd'

type RowProps = {
    title: RowsTitles
    color: string
}

const useStyles = makeStyles<unknown, { color: string }>({
    rowWrapper: {
        backgroundColor: '#2F3137',
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
        marginBottom: 'auto',
        '@media (max-width:1140px)': {
            marginInlineEnd: 'initial',
        }
    },
    title: {
        backgroundColor: props => props.color,
        width: '250px',
        height: '40px',
        padding: '5px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})

export const Row: React.FC<RowProps> = ({title, color}) => {
    const classes = useStyles({color})
    const row = RowStatuses[title]
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards[row])
    let cardsNumber = 0
    if (cards) {
        cardsNumber = cards.length
    }

    return (
        <div className={classes.rowWrapper}>
            <Droppable droppableId={row}>
                {((provided) => {
                    return (
                        <>
                            <div className={classes.title}>
                                <Typography variant={'h6'}>{`${title} (${cardsNumber})`}</Typography>
                            </div>
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {cards && cards.map((c, index) =>
                                    <Draggable key={c.id} draggableId={c.id.toString()} index={index}>
                                        {(provided) => {
                                            return (
                                                <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                     style={{...provided.draggableProps.style}}>
                                                    <Card id={c.id} text={c.text}/>
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )}
                                <CreateCard row={row}/>
                            </div>
                        </>
                    )
                })}
            </Droppable>
        </div>
    )
}