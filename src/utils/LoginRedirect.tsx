import {useSelector} from 'react-redux'
import {AppRootStateType} from '../app/store'
import {Redirect} from 'react-router-dom'
import {PATH} from '../app/Pages'

export const LoginRedirect: React.FC = ({children}) => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)

    if (!isLogged) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <>
            {children}
        </>
    )
}