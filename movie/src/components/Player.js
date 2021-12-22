import React from 'react'
import { useContext,useState ,useEffect} from 'react';
import ReactPlayer from 'react-player/youtube';
import { MovieContext } from './MovieContext';
const Player = () => {
    const[valid,setvalid] =useState(true);
    
    
    const[movies,setmovies,room,setroom,link,setlink,name,setname] = useContext(MovieContext);
    useEffect(() =>{

        setvalid(  ReactPlayer.canPlay(link));
    },[valid]);
    return (
        
        <div>
        
  {valid ? <ReactPlayer onError={() =>{ setvalid(false)}} onProgress={(progress) => {console.log(progress.playedSeconds)}} controls url={link} /> : <p style={{color:"white"}}>URL not valid</p>}        </div>
    )
}

export default Player
