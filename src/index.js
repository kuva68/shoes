import React from 'react'
import ReactDOM from 'react-dom'
import {Reducer} from './reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Kuva from './App'


//import * as firebase from 'firebase/app'
//import * as serviceWorker from './serviceWorker'  
//const sagaMiddleware = createSagaMiddleware()
const store = createStore(Reducer)
//sagaMiddleware.run(RootSaga,store)
ReactDOM.render (
        <Provider store={store}>
        <BrowserRouter>
        <Kuva/>
        </BrowserRouter>
        </Provider>
        ,document.getElementById('root'))
    //    