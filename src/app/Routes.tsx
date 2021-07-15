import {Route, Switch } from "react-router-dom"
import {pages} from './Pages'

const mappedRoutes = pages.map((p) => (
    <Route
        key={p._id}
        path={p.path && (p.path + (p.params || ""))}
        exact={p.exact}
        render={() => p.page}
    />
))

export const Routes = () => {
    return(
        <Switch>
            {mappedRoutes}
        </Switch>
    )
}