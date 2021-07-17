import {Box, Button, Container, createTheme, FormControl, makeStyles, TextField, Typography} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import {login} from './auth-reducer'
import {ThemeProvider} from '@material-ui/core/styles'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../app/Pages'

const theme = createTheme({
    palette: {
        type: 'dark'
    },
    overrides: {
        MuiFormLabel: {
            root: {
                color: '#C8C8CA !important'
            }
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderWidth: '1px',
                borderColor: '#EFEFF0 !important'
            }
        }
    }
})

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

const useStyles = makeStyles((theme) => ({
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
    formInput: {
        marginBottom: theme.spacing(4),
        color: '#FFFFFF'
    },
    formButton: {
        marginBottom: theme.spacing(6)
    }
}))


export const Login = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<LoginInputs>({
        resolver: yupResolver(loginValidationSchema)
    })
    const onSubmit: SubmitHandler<LoginInputs> = data => dispatch(login(data))
    const inputStyle = {WebkitBoxShadow: '0 0 0 1000px #33363D inset'}

    return (
        <ThemeProvider theme={theme}>
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
                            <TextField className={classes.formInput} variant={'outlined'} margin={'normal'}
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
        </ThemeProvider>
    )
}