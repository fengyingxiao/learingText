import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form'
// function hello(){
//     console.log('hello imooc I love React')
// }
// function WrapperHello(fn){
//     return function(){
//         console.log('before say hello')
//         fn()
//         console.log('after say hello')
//     }
// }
//
// hello = WrapperHello(hello)
// hello() //before say hello  hello imooc I love React    after say hello
// function WrapperHello(Comp){
//     class WrapComp extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新增的生命周期， 加载完成')
//         }
//         render(){
//             return <Comp/>
//         }
//     }
//     return WrapComp
// }
// @WrapperHello
// class Hello extends React.Component{
//     render(){
//         return <h2>hello imooc Ilove imooc</h2>
//     }
// }


// Hello = WrapperHello(Hello)

@connect(
    state=>state.user,
    {login}
)
    @imoocForm
class Login extends React.Component{
    constructor(props){
        super(props)

        this.register = this.register.bind(this)
    }
    register(){
        console.log(this.props,10)
        this.props.history.push('/register')
    }

    handleLogin=()=>{
        this.props.login(this.props.state)
    }
    render(){
        return(
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!='/login')?
                    <Redirect to={this.props.redirectTo} />
                    : null
                }
                <Logo />
                <h2>登陆页面</h2>
                <WingBlank>
                    <List>
                        {
                            this.props.msg?
                                <p className="error-msg">{this.props.msg}</p>
                                :null
                        }
                        <InputItem
                            onChange = {(v)=>this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange = {(v)=>this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                        <WhiteSpace />
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
