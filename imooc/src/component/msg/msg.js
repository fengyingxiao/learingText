import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state=>state
)

class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        if(!this.props.chat.chatmsg.length){
            return null
        }
        console.log(this.props,10)
        //按照聊天用户分组，根据chartid
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            console.log(a,26)
            console.log(b,24)
            console.log(this.getLast(a).create_time,27)
            console.log(this.getLast(b).create_time,28)
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        console.log([3,1,2,4].sort(function(a,b){
            return a-b
        }))
        return (
            <div>

                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        console.log(userid)
                        const targetId = v[0].from ===userid?v[0].to:v[0].from
                        const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                        const name = this.props.chat.users[targetId]?this.props.chat.users[targetId].name:''
                            return(
                                <List key={lastItem._id}>
                                    <Item
                                        extra={<Badge text={unreadNum}></Badge>}
                                        thumb={require(`../images/${this.props.chat.users[targetId].avatar}.png`)}
                                        arrow='horizontal'
                                        onClick = {()=>{
                                            this.props.history.push(`/chat/${targetId}`)
                                        }}
                                    >
                                        {lastItem.content}
                                        <Brief>{name}</Brief>
                                    </Item>
                                </List>
                            )
                    })}


            </div>
        )
    }
}

export default Msg