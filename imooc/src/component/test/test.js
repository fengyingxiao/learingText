import React from 'react'
import ProTypes from 'prop-types'

//context是全局的，组件里声明，所有子元素可以直接获取；context对数据类型是要求必传的，所以必须要有proTypes
class WT extends React.Component{
    render(){
        return (
            <div>
                <p>侧边栏</p>
                <Little></Little>
            </div>
        )
    }
}
class Little extends React.Component{
    static contextTypes={
        user:ProTypes.string
    }
    render(){
        console.log(this.context,12)
        return (
            <div>
                <p>我是地步到宝航过{this.context.user}</p>
            </div>
        )
    }
}

class Test extends React.Component{
    static childContextTypes={
        user:ProTypes.string
    }
    constructor(props){
        super(props)
        this.state = {
            user:'蜗牛'
        }
    }
    //子元素想获取context就会从这个方法里面获取
    getChildContext(){
        return this.state
    }
    render(){
        return (
            <div>
                <p>我是{this.state.user}</p>
                <WT></WT>
            </div>
        )
    }
}

export default Test