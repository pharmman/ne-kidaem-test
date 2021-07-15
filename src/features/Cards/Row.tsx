import {CardType} from '../../api/API'
import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import {Card} from './Card'

type RowProps = {
    title: string,
    cards: CardType[],
    cardsNumber: number,
    color: string
}

const useStyles = makeStyles<unknown ,{color:string}>({
    rowWrapper: {
        backgroundColor: '#2F3137',
        maxWidth: '300px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        color: props => props.color,
        width: '300px',
        height: '20px',
    }
})

export const Row: React.FC<RowProps> = ({cards, title, cardsNumber, color}) => {
    const classes = useStyles({color})
    const mappedCards = cards.map(c => <Card key={c.id} id={c.id} text={c.text}/>)
    return (
        <div className={classes.rowWrapper}>
            <div className={classes.title}>
                <Typography variant={'h4'}>{`${title} (${cardsNumber})`}</Typography>
            </div>
            <div>{mappedCards}</div>
        </div>
    )
}