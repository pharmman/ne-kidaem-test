import {Button, Grid, TextField} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'

type LoginInputs = {
    login: string,
    password: string
};

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginInputs>()
    const onSubmit: SubmitHandler<LoginInputs> = data => console.log(data)
    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField id={'login'} label={errors.login && 'Error'}
                               helperText={errors.login && errors.login.message}  {...register('login')}/>
                    <TextField id={'password'} label={errors.password && 'Error'}
                               helperText={errors.login && errors.login.message} type={'email'} {...register('password')}/>
                    <Button color={'primary'} variant={'contained'} type="submit">Login</Button>
                </form>
            </Grid>
        </Grid>
    )
}