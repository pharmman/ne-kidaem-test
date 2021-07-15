import {Button, FormControl, FormGroup, Grid, Paper, TextField} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import {registration} from './auth-reducer'

type RegistrationInputs = {
    login: string
    password: string
    email: string
    passwordConfirm: string
};
const loginRegex = new RegExp('^[\\w.@+-]+$')

const registerValidationSchema = Yup.object().shape({
    login: Yup.string()
        .matches(loginRegex, 'Letters, digits and @/./+/-/_ only')
        .required('Login is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'This password is too short. It must contain at least 8 characters.'),
    passwordConfirm: Yup.string()
        .required('Passwords must match')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const Registration = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrationInputs>({
        resolver: yupResolver(registerValidationSchema)
    })
    const onSubmit: SubmitHandler<RegistrationInputs> = data => {
        dispatch(registration({
            email: data.email,
            password: data.password,
            username: data.login
        }))
    }
    return (
        <Grid container>
            <Grid>
                <Paper style={{padding: '500px'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormGroup>
                                <TextField error={!!errors.email} id={'email'} label={errors.email ? 'Error' : 'Email'}
                                           helperText={errors.email && errors.email.message}
                                           autoComplete={'new-password'} {...register('email')}/>
                                <TextField error={!!errors.login} id={'login'} label={errors.login ? 'Error' : 'Login'}
                                           helperText={errors.login && errors.login.message}
                                           autoComplete={'new-password'} {...register('login')}/>
                                <TextField error={!!errors.password} id={'password'}
                                           label={errors.password ? 'Error' : 'Password'}
                                           autoComplete={'new-password'}
                                           helperText={errors.password && errors.password.message}
                                           type={'password'} {...register('password')}/>
                                <TextField error={!!errors.passwordConfirm} id={'password'}
                                           label={errors.passwordConfirm ? 'Error' : 'Confirm password'}
                                           autoComplete={'new-password'}
                                           helperText={errors.passwordConfirm && errors.passwordConfirm.message}
                                           type={'password'} {...register('passwordConfirm')}/>
                                <Button color={'primary'} variant={'contained'} type="submit">Login</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}