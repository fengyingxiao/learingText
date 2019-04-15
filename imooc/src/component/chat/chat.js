import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from "../../redux/chat.redux";
// import io from 'socket.io-client'
import {getChatId} from "../../util";
import QueueAnim from 'rc-queue-anim'

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[],
            showEmoji:false
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }



    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    fixCarouse(){
        //为了解决图标问题
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        console.log(this.props,35)
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg(from,to,msg)
        this.setState({
            text:'',
            showEmoji:false
        })
    }
    render(){
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const emoji = '👽 💀 🙊 🙉 🙈 👼 👶 👸 😯 😇 😏 👵 👴 👩 👨 👱 😹 😾 👦 💂 😫 😨 😱 😠 😡 😤 😆 😋 😷 😎 😴 😵 😲 😦 😧 😈 👿 😮 😬  😐 😕'
            .split(' ')
            .filter(v=>v) //过滤一下 防止有多个空格的情况
            .map(v=>({text:v}))
        const chatid=getChatId(userid,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return(
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick = {()=>{this.props.history.goBack()}}
                >
                    {users[userid].name}
                </NavBar>
                <QueueAnim type='scale' delay={100}>
                    {chatmsg.map(v=>{
                        const avatar = require(`../images/${users[v.from].avatar}.png`)
                        return v.from == userid?(
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item
                                    extra={<img alt='头像' src={avatar} />}
                                    className='chat-me'>{v.content}</Item>
                            </List>
                        )

                    })}
                </QueueAnim>

                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{
                                            this.setState(state=>({
                                                    showEmoji:!state.showEmoji
                                            }))
                                            this.fixCarouse()
                                        }}
                                    >🙉</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }

                        ></InputItem>
                    </List>
                    {this.state.showEmoji?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el=>{
                                console.log(el)
                                this.setState({
                                    text:this.state.text+el.text
                                })
                            }}
                        />:null
                    }

                </div>
            </div>


        )
    }
}

export default Chat