import React from 'react'
import {Link,Route,Redirect} from 'react-router-dom'
import App from './App'
import {connect} from 'react-redux'
import {logout} from './Auth.redux'
function Erying(){
    return(
        <h2>二营</h2>
    )
}

function Qibinglian(){
    return (
        <h2>骑兵连</h2>
    )
}

@connect(
    state=>state.auth,
    {logout}
)

class Dashboard extends  React.Component{


    render(){
        console.log(this.props.isAuth)
        const match = this.props.match
        console.log(match)
        return(
        this.props.isAuth?<div>
                                <button onClick={this.props.logout}>注销</button>
                                <ul>
                                    <li>
                                        <Link to={`${match.url}/`}>一营</Link>
                                    </li>
                                    <li>
                                        <Link to={`${match.url}/erying`}>二营</Link>
        </li>
                                    <li>
                                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                                    </li>
                                </ul>
                                <Route path={`${match.url}/`} exact component={App} />
                                <Route path={`${match.url}/erying`} component={Erying} />
                                <Route path={`${match.url}/qibinglian`} component={Qibinglian} />

                            </div>:<Redirect to="/login" />
        )
    }
}

export  default Dashboard