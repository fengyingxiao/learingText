import React from 'react'
import Dashboard from "./component/dashboard/dashboard";
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Login from "./container/login/login";
import Register from "./container/register/register";
import Chat from "./component/chat/chat";
import AuthRoute from './component/authroute/authroute'
import {
    Route,
    Switch
} from 'react-router-dom'
class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError :false
        }
    }

    componentDidCatch(err,info){
        console.log(err,info,22)
        this.setState({
            hasError:true
        })
    }
    //boss genius me msg四个页面
//如果route里面只有component，没有path，切外层有switch包裹，那就意味着 如果跳转到switch里面route没有的路径，就会跳转到component
//如果route里面只有component，没有path，切外层没有switch包裹，则就意味着无论跳转到哪个页面 下面都会有component
    render(){
        return this.state.hasError?
            <div>页面出错了</div>
            :(
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo} ></Route>
                    <Route path='/geniusinfo' component={GeniusInfo} ></Route>
                    <Route path = '/login' component={Login} />
                    <Route path = '/register' component={Register} />
                    <Route path = '/chat/:user' component={Chat} />
                    <Route component={Dashboard}></Route>
                </Switch>

            </div>
        )
    }
}
export default App