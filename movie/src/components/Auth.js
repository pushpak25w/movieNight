import React from 'react'

const Auth = () => {
    return (
        <div>
            <form className="form">
                <label className='subtitle'>Enter Your Id</label>
                <input class="input" type="text" required/>
               
                <label className='subtitle' >Enter the Secret Code</label>
                <input class="input" type="text" required/>
                <button className='submit'>Go</button>
            </form>
        </div>
    )
}

export default Auth
