import React from 'react'
import back from '../../assets/back1.mp4'
import './back.css'
export default function Back(){

    return (<>
    
    <div className='main'>
        <video src={back} loop autoPlay muted/>
      </div>
    
    </>)
}