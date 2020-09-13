import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

const Chat = ({ location }) => {
    const ENDPOINT = 'localhost:5000'
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT);
        setName(name)
        setRoom(room)

        socket.emit('login', { name, room }, () => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT, location.search])

    useEffect(()=> {
        socket.on('message', message => {
            setMessages(messages => [...messages, message])
        })
    },[])

    function onHandleMessage(event){
        event.preventDefault()
        setMessage(event.target.value)
    }

    function onHandleEnter(event){
        event.preventDefault()
        //console.log(message)
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
          }
    }

    console.log(message, messages)

    return (
        <div className="chat-container">
    <header className="chat-header">
      <h1><i className="fas fa-smile"></i> ChatCord </h1>
      <a href="index.html" className="btn">Leave Room</a>
    </header>
    <main className="chat-main">
      <div className="chat-sidebar">
        <h3><i className=""></i> Room Name:</h3>
        <h2 id="room-name">{room}</h2>
        <h3><i className=""></i> Users</h3>
        <ul id="users">
          <li>{name}</li>
        </ul>
      </div>
      <div className="chat-messages">
					<div className="message">
						<p className="meta">Brad <span>9:12pm</span></p>
						<p className="text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
							repudiandae.
						</p>
					</div>
					<div className="message">
						<p className="meta">Mary <span>9:15pm</span></p>
						<p className="text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
							repudiandae.
						</p>
					</div>
      </div>
    </main>
    <div className="chat-form-container">
      <form id="chat-form">
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autoComplete="off"
          onChange={onHandleMessage}
        />
        <button className="btn" onClick={onHandleEnter}>Send</button>
      </form>
    </div>
  </div>

    )
}

export default Chat