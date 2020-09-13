import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const history = useHistory()

    function onhandleUser(event){
        event.preventDefault()
        setName(event.target.value)
    }

    function onHandleRoom(event){
        setRoom(event.target.value)
    }

    function onHandleCheck(event){
        if (!name || !room){
            event.preventDefault()
        }
        else {
            history.push( `/chat/?name=${name}&room=${room}` )
        }
    }

    return (
		<div className="join-container">
			<header className="join-header">
				<h1>ChaiChat</h1>
			</header>
			<main className="join-main">
				<form action="chat.html">
					<div className="form-control">
						<label>Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter username..."
                            required
                            onChange={onhandleUser}
						/>
					</div>
					<div className="form-control">
						<label>Rooms</label>
						<select required name="room" id="room" onChange={onHandleRoom}>
                            <option value="">...</option>
							<option value="greentea">Green Tea</option>
							<option value="blacktea">Black Tea</option>
							<option value="redtea">Red Tea</option>
							<option value="browntea">Brown Tea</option>
							<option value="milktea">Milk Tea</option>
							<option value="forbiddentea">Forbidden Tea</option>
						</select>
					</div>
					<button type="submit" className="btn" onClick={onHandleCheck}>Join Chat</button>
				</form>
			</main>
		</div>
    )
    }

export default Login