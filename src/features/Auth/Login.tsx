import {Button, FormControl, FormGroup, Grid, Paper, TextField} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import {login} from './auth-reducer'

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

export const Login = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<LoginInputs>({
        resolver: yupResolver(loginValidationSchema)
    })
    const onSubmit: SubmitHandler<LoginInputs> = data => dispatch(login(data))
    return (
        <Grid container>
            <Grid>
                <Paper style={{padding: '500px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormGroup>
                            <TextField error={!!errors.username} id={'login'} label={errors.username ? 'Error' : 'Login'}
                                       helperText={errors.username && errors.username.message}
                                       autoComplete={'new-password'}  {...register('username')}/>
                            <TextField error={!!errors.password} id={'password'}
                                       label={errors.password ? 'Error' : 'Pasword'}
                                       helperText={errors.password && errors.password.message}
                                       type={'password'} autoComplete={'new-password'} {...register('password')}/>
                            <Button color={'primary'} variant={'contained'} type="submit">Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
                </Paper>
            </Grid>
        </Grid>
    )
}