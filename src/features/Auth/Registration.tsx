import {Box, Button, Container, FormControl, TextField, Typography} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {registration} from './auth-reducer'
import {AppRootStateType} from '../../app/store'
import {NavLink, Redirect} from 'react-router-dom'
import {PATH} from '../../app/Pages'
import {authUseStyles} from './Login'

type RegistrationInputs = {
    username: string
    password: string
    email: string
};
const loginRegex = new RegExp('^[\\w.@+-]+$')
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const registerValidationSchema = Yup.object().shape({
    username: Yup.string()
        .max(150, '150 characters or fewer')
        .matches(loginRegex, 'Letters, digits and @/./+/-/_ only')
        .required('Username is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .matches(
            passwordRegex,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        )
})

export const Registration = () => {
    //styles
    const classes = authUseStyles()
    const inputStyle = {WebkitBoxShadow: '0 0 0 1000px #33363D inset'}

    const dispatch = useDispatch()

    //form
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrationInputs>({
        resolver: yupResolver(registerValidationSchema),
        mode: 'onChange'
    })
    const onSubmit: SubmitHandler<RegistrationInputs> = data => dispatch(registration(data))

    if (isRegistered) return <Redirect to={PATH.LOGIN}/>
    return (
        <Box className={classes.wrapper}>
            <Container className={classes.paper} maxWidth={'xs'}>
                <Typography className={classes.title} variant={'h5'}>Sign Up</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className={classes.form}>
                        <TextField variant={'outlined'} margin={'normal'} error={!!errors.email} id={'email'}
                                   label={'Email'}
                                   helperText={errors.email && errors.email.message}
                                   autoComplete={'new-password'}
                                   inputProps={{style: inputStyle}} {...register('email')}/>
                        <TextField variant={'outlined'} margin={'normal'} error={!!errors.username} id={'username'}
                                   label={'Username'}
                                   helperText={errors.username && errors.username.message}
                                   autoComplete={'new-password'}
                                   inputProps={{style: inputStyle}} {...register('username')}/>
                        <TextField className={classes.lastFormInput} variant={'outlined'} margin={'normal'}
                                   error={!!errors.password} id={'password'}
                                   label={'Password'}
                                   autoComplete={'new-password'}
                                   helperText={errors.password && errors.password.message}
                                   type={'password'} inputProps={{style: inputStyle}} {...register('password')}/>
                        <Button className={classes.formButton} size={'large'} color={'default'} variant={'contained'}
                                type="submit">Registration</Button>
                    </FormControl>
                </form>
                <Typography variant={'overline'} component={'p'}>Already have an account?</Typography>
                <NavLink to={PATH.LOGIN}>Sign In</NavLink>
            </Container>
        </Box>
    )
}