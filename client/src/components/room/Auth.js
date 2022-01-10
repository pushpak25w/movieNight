import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Auth = () => {
    const [name, setname] = useState("");
    const [code, setcode] = useState("");
    const authenticate = () =>{
        //go through json data here 
    }
    return (
        <div>
            <form className="form">
                <label className='subtitle'>Enter Your Id</label>
                <input class="input" type="text" onChange={ (e) =>setname(e.target.value) } value={name} required/>
               
                <label className='subtitle' >Enter the Secret Code</label>
                <input class="input" type="text" onChange={ (e) =>setcode(e.target.value) } value={code} required/>
                <Link to ="/MainPage">

                <button  disabled={(name.length === 0  || code.length ===0)? true :false}  type='submit'  onClick = {(e) =>{ console.log(name,code)}} className='submit'>Go</button>
                </Link>
                
            </form>
        </div>
    )
}

export default Auth
