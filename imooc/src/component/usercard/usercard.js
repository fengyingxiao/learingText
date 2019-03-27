import React from 'react'
import PropTypes from 'prop-types'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
class UserCard extends React.Component{

    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render(){
        const Header =Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userList.map(v=>(

                    v.avatar?
                        <Card key={v._id}>
                            <WhiteSpace></WhiteSpace>
                            <Header
                                title={v.user}
                                thumb={require(`../images/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                                thumbStyle ={{width:30,height:30}}
                            >

                            </Header>
                            <Body>
                            {v.type=='boss'?<div>公司:{v.company}</div>:null}
                            {v.desc.split('\n').map(d=>(
                                <span key={d}>{d}</span>
                            ))}
                            {v.type=='boss'?<div>薪资:{v.money}</div>:null}
                            </Body>
                        </Card>:null
                ))}
            </WingBlank>
        )
    }
}
export default UserCard