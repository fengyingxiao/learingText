import React from 'react'
import ReactDom from 'react-dom'

import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import App from './app'
import './config'
import './index.css'
import {
    BrowserRouter
} from 'react-router-dom'
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
// console.log(store.getState())



//登录没有登录信息则统一跳转到login
//页面



ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)






