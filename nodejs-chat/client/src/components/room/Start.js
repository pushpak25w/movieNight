import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaGetPocket } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div style={{display:"flex" , flexDirection:"column"}}>
        <Link style={{ textDecoration: 'none', marginBottom:"10px" }} to="/CreateRoom">
            <button className='sub'>
             
             <IoIosAddCircle style={{marginTop:"1px"}} className='icons'>
                
             </IoIosAddCircle>
            <>Create a Room</>
             </button>
            </Link>
             
             <h3 style={{alignItems: 'center',color:"white",margin:"auto",width:'0%'}}>or</h3>
             <Link style={{ textDecoration: 'none' ,marginTop:"10px" }} to="/Auth">
             <button className='sub'>
             <FaGetPocket style={{marginTop:"1px"}} className='icons'>
            
             </FaGetPocket>
             
             <p>Join a Room</p>
             </button>
             </Link>
             
        
        </div>
    )
}

export default Start
