import React, { useEffect } from 'react'
import { useContext,useState} from 'react';
import { useLocation } from 'react-router-dom';
import { MovieContext } from './MovieContext';
import Player from './Player';
import io from 'socket.io-client';
import YouTube from 'react-youtube';
let socket;
const MainPage = () => {
    const ENDPT='localhost:5000';
    const location=useLocation();
    const room=location.state?.room;
    const userName=location.state?.userName;
    const [videoUrl,setVideoUrl]=useState('');
    const [videoId,setVideoId]=useState('rdVcT09dEf8');
    useEffect(() => {
        socket=io(ENDPT);
        socket.emit('join-room',{room,userName});
    }, [ENDPT])
    useEffect(() => {
        socket=io(ENDPT);
        socket.on('video', (link) => {
            setVideoUrl(link)
            let index = videoUrl.indexOf('=');
			setVideoId(videoUrl.slice(index + 1, index + 12));
            console.log(videoId);
        });
    }, [videoUrl])
    const handleSubmit=e=>{
        e.preventDefault();
        socket=io(ENDPT);
        socket.emit('videoUrl',videoUrl)
    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
    return (
        <div>
           <button type='submit'>pause</button>
           <button type='submit'>play</button>
           <YouTube videoId={videoId} opts={opts}/>; 
           <form  className="form" onSubmit={handleSubmit} >
                <input className="input" type="text" value={videoUrl} onChange={e=>{setVideoUrl(e.target.value)}}/>
            <button type="submit">submit</button>:null;
            </form>
        </div>
    )
}

export default MainPage
