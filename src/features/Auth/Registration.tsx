import {Button, FormControl, FormGroup, Grid, Paper, TextField} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {registration, setIsRegistered} from './auth-reducer'
import {AppRootStateType} from '../../app/store'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../app/Pages'

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
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
})

export const Registration = () => {
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrationInputs>({
        resolver: yupResolver(registerValidationSchema),
        mode: 'onChange'
    })
    const onSubmit: SubmitHandler<RegistrationInputs> = data => {
        dispatch(registration(data))
    }

    if (isRegistered) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <Grid container>
            <Grid>
                <Paper style={{padding: '500px'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormGroup style={{minWidth: '300px'}}>
                                <TextField error={!!errors.email} id={'email'} label={'Email'}
                                           helperText={errors.email && errors.email.message}
                                           autoComplete={'new-password'} {...register('email')}/>
                                <TextField error={!!errors.username} id={'username'}
                                           label={'Username'}
                                           helperText={errors.username && errors.username.message}
                                           autoComplete={'new-password'} {...register('username')}/>
                                <TextField error={!!errors.password} id={'password'}
                                           label={'Password'}
                                           autoComplete={'new-password'}
                                           helperText={errors.password && errors.password.message}
                                           type={'password'} {...register('password')}/>
                                <Button color={'primary'} variant={'contained'} type="submit">Registration</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}