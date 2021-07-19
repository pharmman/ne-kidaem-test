import React from 'react'
import {Provider} from 'react-redux'
import './App.css'
import {Main} from './Main'
import {store} from './store'
import {HashRouter} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    )
}

export default App
