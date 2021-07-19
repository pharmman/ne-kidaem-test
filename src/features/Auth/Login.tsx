import {Box, Button, Container, FormControl, makeStyles, TextField, Typography} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout, setIsLogged} from './auth-reducer'
import {NavLink, Redirect} from 'react-router-dom'
import {PATH} from '../../app/Pages'
import {useEffect, useState} from 'react'
import {AppRootStateType} from '../../app/store'
import {saveState} from '../../utils/localStorageUtils'

type LoginInputs = {
    username: string
    password: string
};

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Login is required'),
    password: Yup.string()
        .required('Password is required')
})

export const authUseStyles = makeStyles((theme) => ({
    wrapper: {
        height: '100vh',
        backgroundColor: 'var(--main-bg-color)',
        display: 'flex',
        alignItems: 'center',
        color: '#FFFFFF'
    },
    paper: {
        maxWidth: '438px',
        maxHeight: '600px',
        textAlign: 'center'
    },
    title: {
        marginBottom: theme.spacing(5),
        paddingTop: theme.spacing(5)
    },
    form: {
        width: '80%'
    },
    lastFormInput: {
        marginBottom: theme.spacing(4),
        color: '#FFFFFF'
    },
    formButton: {
        marginBottom: theme.spacing(6)
    }
}))


export const Login = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
    const [redirect, setRedirect] = useState(false)
    const [first, setFirst] = useState(true)

    //styles
    const classes = authUseStyles()
    const inputStyle = {WebkitBoxShadow: '0 0 0 1000px #33363D inset'}

    //form
    const {register, handleSubmit, formState: {errors}} = useForm<LoginInputs>({
        resolver: yupResolver(loginValidationSchema)
    })
    const onSubmit: SubmitHandler<LoginInputs> = data => dispatch(login(data))

    saveState({
        cards: {},
    } as AppRootStateType)

    useEffect(() => {
        if (first) {
            dispatch(logout())
            dispatch(setIsLogged({isLogged: false}))
            setFirst(false)
        } else {
            if (isLogged) setRedirect(true)
        }
    }, [isLogged, first, dispatch])

    if (redirect) return <Redirect to={PATH.APPLICATION}/>

    return (
        <Box className={classes.wrapper}>
            <Container className={classes.paper} maxWidth={'xs'}>
                <Typography className={classes.title} variant={'h5'}>Sign In</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className={classes.form}>
                        <TextField variant={'outlined'} margin={'normal'} size={'medium'}
                                   error={!!errors.username} id={'login'} label={'Login'}
                                   helperText={errors.username && errors.username.message}
                                   inputProps={{style: inputStyle}}
                                   {...register('username')}/>
                        <TextField className={classes.lastFormInput} variant={'outlined'} margin={'normal'}
                                   error={!!errors.password} id={'password'}
                                   label={'Password'}
                                   helperText={errors.password && errors.password.message}
                                   type={'password'}
                                   autoComplete={'current-password'}
                                   inputProps={{style: inputStyle}} {...register('password')}/>
                        <Button className={classes.formButton} size={'large'} color={'default'}
                                variant={'contained'}
                                type="submit">Login</Button>
                    </FormControl>
                </form>
                <Typography variant={'overline'} component={'p'}>Don’t have an account?</Typography>
                <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
            </Container>
        </Box>
    )
}