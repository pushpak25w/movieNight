import React from 'react'

const CreateRoom = () => {
    return (
        <div>
            <form className="form">
            <h2 style={{color:"white",marginLeft:'70px'}}>Create Room</h2>
                <label className='subtitle'>Enter Your Name</label>
                <input class="input" type="text" required/>
               
              
                <button onClick = {(e) =>{ e.preventDefault(); }}className='submit'>Next</button>
            </form>
        </div>
    )
}

export default CreateRoom
