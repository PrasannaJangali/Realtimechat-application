const io=require("socket.io")(8080,{
    cors: {
      origin: '*',
    }
  });

const users={};
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log(name , " has joined");
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    })
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })
    socket.on('disconnect',name=>{
      socket.broadcast.emit('removed',users[socket.id]);
      delete users[socket.id];
    })
})