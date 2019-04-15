import React from 'react'
// import logoImg from './logo.png'
import './logo.css'
class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img alt='头像' src={require('./logo.png')} />
            </div>
        )
    }
}

export default Logo
