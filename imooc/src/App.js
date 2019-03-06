import React from 'react'
import {connect} from 'react-redux'
import {addGun,removeGun,addGunAsync} from './index.redux'

@connect(
    //你要state什么属性放到props
    state=>({num:state.counter}),
    //你要什么方法放到props，会自动放到dispatch
    {addGun,removeGun,addGunAsync}
)
class App extends React.Component{
    render(){
        return(
            <div>
                <h1>现在有机关枪{this.props.num}把</h1>
                <button onClick={this.props.addGun}>申请机关枪</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>推迟两天得到机关枪</button>
            </div>
        )
    }
}

export default App
// import React from 'react'
//
// class App extends React.Component{
//     render(){
//         // const {store,addGun,removeGun,addGunAsync} = this.props
//         // const num = store.getState()
//         const {store,addGun,removeGun,addGunAsync} = this.props
//         const num = store.getState()
//         return (
//             <div>
//                 <h1>现在有多少把{num}</h1>
//                 <button onClick={()=>store.dispatch(addGun())}>加几把</button>
//                 <button onClick={()=>store.dispatch(removeGun())}>减几把</button>
//                 <button onClick={()=>store.dispatch(addGunAsync())}>延迟几秒给</button>
//             </div>
//         )
//     }
// }
// export default App
//<div>
//                 <h1>现在有机枪{num}把</h1>
//                 <button onClick={()=>store.dispatch(addGun())}>申请机关枪</button>
//                 <button onClick={()=>store.dispatch(removeGun())}>上缴武器</button>
//                 <button onClick={()=>store.dispatch(addGunAsync())}>2秒以后再给</button>
//             </div>




// import React from 'react'
// import {connect} from 'react-redux'
// import{addGun,removeGun,addGunAsync} from "./index.redux";
// // const mapStateToProps=(state)=>{
// //     console.log(state,62)
// //     return {num:state}
// // }
// // const actionCreators = {addGunAsync,addGun,removeGun}
// // @connect(mapStateToProps,actionCreators)
//
// @connect(
//     //你要state什么属性放到props
//     state=>({num:state}),
//     //你要什么方法放到props，会自动放到dispatch
//     {addGunAsync,addGun,removeGun}
// )
// class App extends React.Component{
//
//     render(){
//         const {num,addGun,removeGun,addGunAsync} = this.props
//
//         return (
//             <div>
//                 <h1>现在有机枪{num}把</h1>
//                 <button onClick={addGun}>申请机关枪</button>
//                 <button onClick={removeGun}>上缴武器</button>
//                 <button onClick={addGunAsync}>2秒以后再给</button>
//             </div>
//         )
//     }
// }
//
//
//
// // App = connect(mapStateToProps,actionCreators)(App)
//
// export default App