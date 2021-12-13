import React from 'react'
import { useState } from 'react';
const Auth = () => {
    const [name, setname] = useState("");
    const [code, setcode] = useState("");
    return (
        <div>
            <form className="form">
                <label className='subtitle'>Enter Your Id</label>
                <input class="input" type="text" onChange={ (e) =>setname(e.target.value) } value={name}required/>
               
                <label className='subtitle' >Enter the Secret Code</label>
                <input class="input" type="text" onChange={ (e) =>setcode(e.target.value) } value={code} required/>
                <button onClick = {(e) =>{ e.preventDefault(); console.log(name,code)}}className='submit'>Go</button>
            </form>
        </div>
    )
}

export default Auth
