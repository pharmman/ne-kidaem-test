import {RowStatuses} from '../../api/API'
import {Row} from './Row'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getCards} from './cards-reducer'
import {useHistory, useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/core'
import {AppRootStateType} from '../../app/store'

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
    const mappedCards = statuses.map((s: string, index) => <Row key={index} title={s as RowsTitles}
                                                                color={titlesColor[s as RowsTitles]}/>)

    useEffect(() => {
            dispatch(getCards())
    }, [dispatch])

    return (
        <div className={classes.wrapper}>
            {mappedCards}
        </div>
    )
}