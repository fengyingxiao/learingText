import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{

    logout=()=>{
        const alert = Modal.alert
        alert('注销','确认退出登录吗',[
            {text:'取消',onPress:()=>{}},
            {text:'确认',onPress:()=>{
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                }}
        ])
        //

    }
    render(){
        console.log(this.props,222222222222)
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user?(
            <div>
                <Result
                    img={<img style={{width:50}} src={require(`../images/${props.avatar}.png`)} alt="" />}
                    title={props.user}
                    message={props.type=='boss'?props.company:null}
                />
                <List
                    renderHeader={()=>'简介'}
                >
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资：{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace />
                <Button onClick={this.logout}  type='primary'>退出登录</Button>
            </div>
        ):<Redirect to={props.redirectTo} />
    }

}
export default User