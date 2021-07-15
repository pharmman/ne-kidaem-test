import React from 'react'
import {Provider} from 'react-redux'
import './App.css'
import {Main} from './Main'
import {store} from './store'
import {BrowserRouter} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
