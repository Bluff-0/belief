import React from 'react';
import {ReactComponent as LoadingIcon} from '../asset/image/spotify-logo.svg';
import '../App.css'

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'lightgreen'
        }}>
            <LoadingIcon style={{ height: '10vh', borderRadius: '50%' }} className= 'rotating'/>
        </div>
    )
}

export default Loading;