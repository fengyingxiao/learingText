import React from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {List,InputItem,Radio,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import imoocForm from '../../component/imooc-form/imooc-form'
@connect(
    state=>state.user,
    {register}
)
@imoocForm
class Register extends React.Component{

    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    handleRegister=()=>{
        console.log(this.state)
        this.props.register(this.props.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {
                    this.props.redirectTo?
                    <Redirect to={this.props.redirectTo} />:null
                }
                <Logo />
                <List>
                    {
                        this.props.msg?
                        <p className="error-msg">{this.props.msg}</p>
                            :null
                    }
                    <InputItem
                        onChange = {(v)=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type = 'password'
                        onChange = {(v)=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type = 'password'
                        onChange = {(v)=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.props.state.type === 'genius'}
                        onChange={()=>this.props.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem
                        checked={this.props.state.type === 'boss'}
                        onChange={()=>this.props.handleChange('type','boss')}
                    >
                        Boss
                    </RadioItem>
                    <WhiteSpace />
                    <Button
                        type='primary'
                        onClick={this.handleRegister}
                    >注册</Button>
                </List>
            </div>
        )
    }
}

export default Register
