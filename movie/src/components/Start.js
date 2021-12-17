import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaGetPocket } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div>
             <button className='sub'>
             
             <IoIosAddCircle className='icons'>
            
             </IoIosAddCircle>
             Create a Room
             </button>
             <h3 style={{alignItems: 'center',color:"white",margin:'auto',width:'0%'}}>or</h3>
             <Link to="/Auth">
             <button className='sub'>
             <FaGetPocket className='icons'>
            
             </FaGetPocket>
             Join a Room</button>
             </Link>
             
        
        </div>
    )
}

export default Start
