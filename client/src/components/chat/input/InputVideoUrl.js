import React from 'react';
import './Input.css';
const InputVideoUrl = ({ VideoUrl, setVideoUrl, sendVideoUrl }) => {
    return (
        <form action="" onSubmit={sendVideoUrl} className="form">
            <input type="text" className="input"
                placeholder="Type a message"
                value={VideoUrl}
                onChange={event => setVideoUrl(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendVideoUrl(event) : null}
            />
            <button className="sendButton">Send URL</button>
        </form>
    )
}

export default InputVideoUrl
