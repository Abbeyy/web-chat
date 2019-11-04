import React from 'react';
import '../resources/sappo.css';
import axios from 'axios';

class ChatBox extends React.Component {
    state = {
        exitChat: false
    }

    exitChat = () => {
        let objIdToDelete = null;
        this.props.allUsers.forEach((dat) => {
            if (dat.name == this.state.name) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('http://localhost:3001/api/deleteData', {
            data: {
                id: objIdToDelete,
            },
        });

        this.setState({exitChat: true});

        this.props.socket.emit('disconnect');
        this.props.socket.disconnect();
    };

    render() {
        return (
            <div>
                {!this.state.exitChat ?
                    <div>
                        <form className="messages-box">}
                                    <h1>Chat Box</h1>
                                    <br></br>
                                    <label>Message</label>
                                    <textarea placeholder="Write your message..." name="chat-msg" required></textarea>
                                    <button type="submit" className="button-send">Send!</button>
                                </form>
                                <button onClick={this.exitChat}>Exit Chatroom</button></div>
                :
                    <div>
                        You exited the chat. Come back soon!
                    </div>}
            </div>
        );
    }
}

export default ChatBox;