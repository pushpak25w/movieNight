import React from 'react'
import { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from './MovieContext';

const CreateRoom = () => {
    const[movies,setmovies,room,setroom,link,setlink,name,setname] = useContext(MovieContext);
    const [room1, setroom1] = useState('');
    const [link1, setlink1] = useState('');
    const [name1, setname1] = useState('');
    const handleClick = () =>{
 
        setmovies(prevMovies => [...prevMovies ,{name:name,link:link,room:room}])
        console.log(movies.length);
        // setid(name);
        setlink1('');
        setname1('');
        setroom1('');
        // console.log(" the id is " + id);
    }
    return (
        
        <div>
            <form  className="form">
            <h2 style={{color:"white",marginLeft:'70px'}}>Create Room </h2>
                <label className='subtitle'>Enter Your Name</label>
                <input class="input" type="text" value={room1} onChange={(e) => {setroom(e.target.value); setroom1(e.target.value)}} required/>
                
                <label className='subtitle' >Enter Youtube's Link </label>
                <input className="input"  type="text" value={link1} onChange={(e) =>{ setlink(e.target.value);setlink1(e.target.value)}} required/>
               
                <label className='subtitle' >Enter Room's Name</label>
                
                <input className="input" type="text" value={name1} onChange={(e) => {setname(e.target.value);setname1(e.target.value)}} required/>
                <Link to="/MainPage">
                <button type='submit' onClick={(e) => {handleClick();} } className='submit'>Start Room</button>
                </Link>
            </form>
        </div>
       
    )
}

export default CreateRoom