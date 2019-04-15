import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const avatarList = 'boy1,boy2,boy3,boy4,boy5,boy6,girl1,girl2,girl3,girl4,girl5'
                            .split(',')
                            .map(v=>({
                                icon:require(`../images/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.text ?
                            (<div>
                                <span>已选择头像</span>
                                <img alt='头像' style={{width:20}} src={this.state.icon} />
                            </div>):<div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}></List>
                <Grid
                    data={avatarList}
                    onClick={elm=>{
                        console.log(elm)
                        // this.setState({
                        //     text:elm.text,
                        //     icon:elm.icon
                        // })
                        //他是上述的简写方式
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                    }}
                />
                头像选择
            </div>
        )
    }
}

export default AvatarSelector