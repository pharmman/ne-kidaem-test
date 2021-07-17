import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import React, {useState} from 'react'
import {Button, FormControl, FormHelperText, makeStyles, TextField} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {createCard} from '../cards-reducer'
import {RowStatuses} from '../../../api/API'
import {SubmitHandler, useForm} from 'react-hook-form'

type CreateCardProps = {
    row: RowStatuses
}

type CreateCardInputs = {
    text: string
}

const useStyles = makeStyles({
    wrapper: {
        width: '200px',
    }
})

export const CreateCard: React.FC<CreateCardProps> = ({row}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [addCard, setAddCard] = useState(false)
    const {register, handleSubmit, formState: {errors}, reset} = useForm<CreateCardInputs>({})

    const onSubmit: SubmitHandler<CreateCardInputs> = (data,e) => {
        addingCard(data.text)
        reset(e?.target.reset())
    }

    const addingCard = (text: string) => {
        dispatch(createCard({row, text}))
        setAddCard(false)
    }

    const addingCardComponent = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <TextField
                    multiline
                    rows={2}
                    {...register('text', {required: true})}
                />
                {errors.text && <FormHelperText error={!!errors.text}>{errors.text.message}</FormHelperText>}
            </FormControl>
            <div>
                <Button type="submit">Добавить карточку</Button>
                <Button onClick={() => setAddCard(false)}><CloseIcon/></Button>
            </div>
        </form>
    )

    return (
        <div className={classes.wrapper}>
            {addCard ?
                addingCardComponent
                :
                <Button onClick={() => setAddCard(true)}><AddIcon fontSize={'small'}/>Добавить карточку</Button>
            }

        </div>
    )
}