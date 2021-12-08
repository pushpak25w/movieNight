import React from 'react'

const Auth = () => {
    return (
        <div>
            <form>
                <label>Enter Your Id</label>
                <input type="text" required/>
                <label>Enter the Secret Code</label>
                <input type="text" required/>

            </form>
        </div>
    )
}

export default Auth
