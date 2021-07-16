import {CardType, RowStatuses} from '../../api/API'
import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import {CreateCard} from './Card/CreateCard'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {RowsTitles} from './RowsList'
import {Card} from './Card/Card'

type RowProps = {
    title: RowsTitles
    color: string
}

const useStyles = makeStyles<unknown, { color: string }>({
    rowWrapper: {
        backgroundColor: '#2F3137',
        color: '#686D76',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        margin: '10px'
    },
    title: {
        backgroundColor: props => props.color,
        width: '200px',
        height: '30px',
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
            <div className={classes.title}>
                <Typography variant={'h6'}>{`${title} (${cardsNumber})`}</Typography>
            </div>
            <div>
                {cards && cards.map((c, index) => <Card key={index} id={c.id} text={c.text}/>)}
            </div>
            <CreateCard row={row}/>
        </div>
    )
}