import React from 'react'
import ReactDom from 'react-dom'

import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import './config'
import './index.css'
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
// console.log(store.getState())



//登录没有登录信息则统一跳转到login
//页面


//boss genius me msg四个页面
//如果route里面只有component，没有path，切外层有switch包裹，那就意味着 如果跳转到switch里面route没有的路径，就会跳转到component
//如果route里面只有component，没有path，切外层没有switch包裹，则就意味着无论跳转到哪个页面 下面都会有component
ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo} ></Route>
                        <Route path='/geniusinfo' component={GeniusInfo} ></Route>
                        <Route path = '/login' component={Login} />
                        <Route path = '/register' component={Register} />
                        <Route component={Dashboard}></Route>
                    </Switch>

                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)






