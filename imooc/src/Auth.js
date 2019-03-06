/**
 * Created by fengyingxiao on 2018/3/30.
 */
import React from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'
import {Redirect} from 'react-router-dom'
//
@connect(
    state=>state.auth,
    {login}

)
class Auth extends  React.Component{


    render(){
        return(
            <div>
                <h2>Auth page</h2>
                <button onClick={this.props.login}>登录</button>
                {this.props.isAuth?<Redirect to="/dashboard" />:null}
            </div>
        )
    }
}

export  default Auth