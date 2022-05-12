const socket=io("http://localhost:8080");

const form=document.getElementById('send-message');
const messageinput=document.getElementById('messageInp');
const output=document.querySelector('.container');

const append=(message,position)=>{
    const messagebox=document.createElement('div');
    messagebox.innerText=message;
    messagebox.classList.add('message');
    messagebox.classList.add(position);
    output.append(messagebox);
}
const inpname=prompt('enter your name','ABC');
socket.emit('new-user-joined',inpname);
socket.on('user-joined',name =>{
    append(`${name} has joined `,'left');
})
var audio=new Audio('notification.mp3');
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
    audio.play();
})
socket.on('removed',name=>{
    append(`${name} has left the chat`,'left');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=document.getElementById('messageInp').value;
    document.getElementById('messageInp').value='';
    
    append( `You: ${msg}`,'right');
    socket.emit('send',msg);
})
