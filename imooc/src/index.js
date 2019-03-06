import React from 'react'
import ReactDom from 'react-dom'

import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Auth from './Auth'
import Dashboard from './Dashboard'
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


ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {/* 只渲染命中的第一个Route */}
                    <Route path='/login'  component={Auth}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Redirect to="/dashboard" />
                </Switch>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)


//
// import {createStore} from 'redux'
//
// //通过reducer建立
// //根据老大state和action生成新的state
// function counter(state=0,action){
//     switch(action.type){
//         case '加机关枪':
//             return state+1
//         case '减机关枪':
//             return state -1
//         default:
//             return 10
//     }
// }
//
// //新建store
// const store  = createStore(counter)
// const init  = store.getState()
// console.log(init)
// function listener(){
//     const current = store.getState()
//     console.log(`现在有机枪${current}把`)
// }
// store.subscribe(listener)
// //派发事件
// store.dispatch({type:'加机关枪'})

// import {counter ,addGun,removeGun,addGunAsync} from './index.redux'
// const reduxDevtools = window.devToolsExtension? window.devToolsExtension():()=>{}
// // const store = createStore(counter,applyMiddleware(thunk))
// const store = createStore(counter,compose(
//     applyMiddleware(thunk),
//     reduxDevtools
// ))
// import {createStore,applyMiddleware,compose} from 'redux'
// import thunk from 'redux-thunk'
// import React from 'react'
// import ReactDom from 'react-dom'
// import {createStore,applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import {counter,addGun,removeGun,addGunAsync} from './index.redux'
//
// import App from './App'
// const store = createStore(counter, applyMiddleware(thunk))
// function render(){
//     ReactDom.render(
//         <App store={store} addGun={addGun} removeGun ={removeGun} addGunAsync={addGunAsync} />,document.getElementById('root'))
// }
// render()
// store.subscribe(render)

//store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync}
// store.subscribe(render)
//
// compose



//
// import React from 'react'
// import ReactDom from 'react-dom'
// import {createStore,applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider} from 'react-redux'
// import App from './App'
// import {counter} from './index.redux'
// // const reduxDevtools = window.devToolsExtension? window.devToolsExtension():()=>{}
// const store = createStore(counter,applyMiddleware(thunk))
// // const store = createStore(counter,compose(
// //     applyMiddleware(thunk),
// //     reduxDevtools
// // ))
//
// ReactDom.render(
//     (<Provider store={store}>
//         <App />
//     </Provider>),
//     document.getElementById('root')
// )



