import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import React, {useState} from 'react'
import {Box, Button, FormControl, FormHelperText, makeStyles, TextField} from '@material-ui/core'
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
        width: '100%',
        display: 'flex'
    },
    openInputButton: {
        width: '100%',
        justifyContent: 'start',
        color: '#919697',
        '&:hover': {
            backgroundColor: '#26282C'
        }
    },
    closeInputButton: {
        color: '#FFFFFF',
    },
    textarea: {
        padding: '10px',
        marginRight: '-10px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
})

export const CreateCard: React.FC<CreateCardProps> = ({row}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [addCard, setAddCard] = useState(false)
    const {register, handleSubmit, formState: {errors}, reset} = useForm<CreateCardInputs>({})

    const onSubmit: SubmitHandler<CreateCardInputs> = (data, e) => {
        addingCard(data.text)
        reset(e?.target.reset())
    }

    const addingCard = (text: string) => {
        dispatch(createCard({row, text}))
        setAddCard(false)
    }

    const onKeyPressHandler = (e:React.KeyboardEvent<HTMLDivElement>) => {
        (e.ctrlKey && e.code === 'Enter') && handleSubmit(onSubmit)()
    }

    const addingCardComponent = (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormControl className={classes.textarea}>
                <TextField
                    variant={'filled'}
                    multiline
                    rows={4}
                    placeholder={'Ввести заголовок для этой карточки'}
                    InputProps={{
                        style: {
                            fontSize: '14px',
                            padding: '6px 6px 10px'
                        },
                    }}
                    onKeyPress={onKeyPressHandler}
                    {...register('text', {required: true})}
                />
                {errors.text && <FormHelperText error={!!errors.text}>Cards can't be empty</FormHelperText>}
            </FormControl>
            <Box marginLeft={'10px'}>
                <Button className={classes.closeInputButton} type="submit">Добавить карточку</Button>
                <Button  onClick={() => setAddCard(false)}><CloseIcon/></Button>
            </Box>
        </form>
    )

    return (
        <div className={classes.wrapper}>
            {addCard ?
                addingCardComponent
                :
                <Button className={classes.openInputButton} onClick={() => setAddCard(true)}><AddIcon
                    fontSize={'small'}/>Добавить карточку</Button>
            }

        </div>
    )
}