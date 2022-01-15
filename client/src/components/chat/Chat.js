import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Messages from './messages/Messages';
import InputChat from './input/InputChat';
import InputVideoUrl from './input/InputVideoUrl';
import './Chat.css';
import YouTube from 'react-youtube';
let socket;
const Chat = () => {
    const ENDPT = '127.0.0.1:5000';
    const { user} = useContext(UserContext);
    let { room_id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [videoUrl,setVideoUrl]=useState('');
    const [videoId,setVideoId]=useState('');
    useEffect(() => {
        socket = io(ENDPT);
        socket.emit('join', { name: user.name, room_id, user_id: user._id });
    }, [])
    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages])
    useEffect(() => {
        socket.emit('get-videoUrl', room_id)
        socket.on('display-video', link => {
            console.log(link);
            setVideoId(link);
        })
    }, [videoId])
    useEffect(() => {
        socket.emit('get-messages-history', room_id)
        socket.on('output-messages', messages => {
            setMessages(messages)
            console.log("messages are",messages);
        })
    }, [])
    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            console.log(message);
            socket.emit('sendMessage', message, room_id, () => setMessage(''))
        }
    }
    const sendRecommends = event => {
        event.preventDefault();
        socket.emit('sendRecommends', room_id);
    }
    const sendVideoUrl = event => {
        event.preventDefault();
        if (videoUrl) {
            console.log(videoUrl);
            socket.emit('sendVideoUrl', videoUrl, room_id, () => setVideoUrl(''))
        }
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
        <div className="outerContainer">
            <div className="container" >
            <button onClick={sendRecommends}>recommend rooms</button>
                <Messages messages={messages} user_id={user._id} />
                <InputChat
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <div className="container" >
                <YouTube videoId={videoId} opts={opts}/>
                    <InputVideoUrl
                        videoUrl={videoUrl}
                        setVideoUrl={setVideoUrl}
                        sendVideoUrl={sendVideoUrl}
                    />
                    {/* <input className="input" type="text" value={videoId} onChange={e=>{setVideoId(e.target.value)}}/> */}
                {/* <button type="submit">submit</button>; */}
            </div>
        </div>
    )
}

export default Chat
