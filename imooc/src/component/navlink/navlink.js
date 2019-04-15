import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@connect(
    state=>state.chat
)
@withRouter
class NavLinkBar extends React.Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        console.log(navList)
        const {pathname} = this.props.location
        return (
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path=='/msg'?this.props.unread:0}
                        title={v.text}
                        key={v.path}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}active.png`)}}
                        selected={pathname === v.path}
                        onPress={()=>{
                            this.props.history.push(v.path,{aaa:11111})
                        }}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}
export default NavLinkBar