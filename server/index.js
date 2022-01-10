const cors=require("cors");
const corsOptions ={
   origin:'http://127.0.0.1:3000',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ytdl = require('ytdl-core');
const authRoutes = require('./routes/authRoutes');
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const socketio = require('socket.io')
const io = socketio(http);
const mongoDB = "mongodb+srv://asd:asd@cluster0.xxhht.mongodb.net/chat-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB,).then(() => console.log('database connected')).catch(err => console.log(err))
const { addUser, getUser, removeUser } = require('./helper');
const Message = require('./models/Message');
const PORT = process.env.PORT || 5000;
const Room = require('./models/Room');
const axios=require('axios');
app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'Tony');
    res.cookie('isAuthenticated', true, { maxAge: 24 * 60 * 60 * 1000 });
    res.send('cookies are set');
})
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    res.json(cookies);
})
io.on('connection', (socket) => {
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', (roomName,link) => {
        const room = new Room({ 
            name:roomName,
            link:link,
        });
        room.save().then(result => {
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('join error', error);
        } else {
            // console.log('join user', user);
        }
    })
    socket.on('sendMessage', (message, room_id, callback) => {
        const user = getUser(socket.id);
        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id,
            text: message
        }
        const msg = new Message(msgToStore);
        msg.save().then(result => {
            io.to(room_id).emit('message', result);
            callback()
        })
    })
    socket.on('sendRecommends', (room_id) => {
        Room.find().then(result=>{
            var rooms=[],links=[],curr_room="";
            for(let i=0;i<result.length;i++){
                if(result[i]._id==room_id)curr_room=result[i].name;
                rooms.push(result[i].name);
                links.push(ytdl.getURLVideoID(result[i].link));
            }
            axios.put(`http://127.0.0.1:6000/category/${curr_room}`,{'rooms':rooms,'links':links})
            .then(
                (response)=>{
                    var roomsData=response.data.recommendations;
                    var recs=""
                    for(let i=0;i<roomsData.length;i++){
                        if(roomsData[i].name!=null){
                            recs+=roomsData[i].name;
                            if(i<roomsData.length-1)recs+=', '
                        }
                    }
                    if(recs.length==0)recs='no recommendations for now';
                    const msg = {
                        name: 'recommendations',
                        user_id: '61dc3694b010fd5369473c4a',
                        room_id,
                        text: recs
                    }
                    const recommendations = new Message(msg);
                    io.to(room_id).emit('message', recommendations);
                },
                (error)=>{
                    console.log(error);
                }
            )
        });
    })
    socket.on('sendVideoUrl', (videoUrl,room_id,callback) => {
        Room.findByIdAndUpdate(room_id,{link:videoUrl},(err,docs)=>{
            if(err){
                console.log(err);
            }else{
                io.to(room_id).emit('display-video',videoUrl);
                callback();
            }
        })
    })
    socket.on('get-videoUrl', room_id => {
        Room.find({"_id":room_id}).then(result=>{
            result=ytdl.getURLVideoID(result[0].link);
            socket.emit('display-video',result);
        });
    })
    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result)
        });
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
