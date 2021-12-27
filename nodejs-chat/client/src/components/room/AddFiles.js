import React from 'react'

const AddFiles = () => {
    
    return (
        <div className='addFiles'>
           
            <form style={{margin:"10px"}} className="form line">
                
                <label className='subtitle' >Enter Youtube's Link </label>
                <input className="input"  type="text"required/>
                <button onClick={(e) => e.preventDefault()} className='submit'>Submit</button>
            </form>
            
            <form style={{margin:"10px"}} className="form">
                
                <label className='subtitle' >Enter Room's Name</label>
                <input className="input" type="text"required/>
                <button onClick={(e) => e.preventDefault()} className='submit'>Start Room</button>
            </form>
            
        </div>
    )
}

export default AddFiles
