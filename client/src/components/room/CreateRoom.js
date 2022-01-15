import React from 'react'
import { useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from './MovieContext';
let socket;
const CreateRoom = () => {
    const [room,setRoom]=useState('');
    const [userName,setUserName]=useState('');
    return (
        
        <div>
            <form  className="form">
            <h2 style={{color:"white",marginLeft:'70px'}}>Create Room </h2>
                <label className='subtitle'>Enter Your Name</label>
                <input className="input" type="text" value={userName} onChange={e=> {setUserName(e.target.value)}}/>
                
                {/* <label className='subtitle' >Enter Youtube's Link </label>
                <input className="input"  type="text" value={link1} onChange={(e) =>{ setlink(e.target.value);setlink1(e.target.value)}} required/>
                */}
                <label className='subtitle' >Enter Room's Name</label>
                
                <input className="input" type="number" value={room} onChange={(e) => {setRoom(e.target.value)}}/>
                <Link to={{
                    pathname:'/MainPage',
                    state:{
                        room:room,
                        userName:userName
                    }
                    }}>
                <button type='submit'className='submit'>Start Room</button>
                </Link>
            </form>
        </div>
       
    )
}

export default CreateRoom