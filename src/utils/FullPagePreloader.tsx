import {CircularProgress, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        height: '100vh',
        backgroundColor: 'var(--main-bg-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    preloader: {
        fontSize: '72px'
    }
})

export const FullPagePreloader = () => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            {/*<CircularProgress size={100}/>*/}
        </div>
    )
}