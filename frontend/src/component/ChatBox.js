import React from 'react';
import '../resources/sappo.css';
import axios from 'axios';

class ChatBox extends React.Component {
    state = {
        exitChat: false,
        name: null,
        message: "",
        coordinates: "",
        temperature: "",
        species: "",
        abundance: 0
    }

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.state.name = this.props.name;
    }

    exitChat = () => {
        let objIdToDelete = null;
        this.props.allUsers.forEach((dat) => {
            if (dat.name == this.state.name) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('http://localhost:3001/sappo/deleteData', {
            data: {
                id: objIdToDelete,
            },
        });

        this.setState({exitChat: true});

        this.props.socket.emit('disconnect');
        this.props.socket.disconnect();
    };

    handleOnChange(e) {
        this.setState({[e.target.id]: e.target.value});
    };

    handleMessageSubmit(e) {
        e.preventDefault();

        let sendM = this.sendMessage;
        // let self = this;

        axios.post('http://localhost:3001/sappo/putMessage', {
            user: this.state.name,
            message: this.state.message,
        })
            .then(function (resp) {
                console.log(resp);
                sendM();
            })
            .catch(function (err) {
                console.log(err);
            });

    }

    sendMessage = () => {
        this.props.socket.emit('new message',
            {message: this.state.message,
                coordinates: this.state.coordinates,
                temperature: this.state.temperature,
                species: this.state.species,
                abundance: this.state.abundance
        });
    };

    render() {
        return (
            <div>
                {!this.state.exitChat ?
                    <div className="messages-container">
                        <form onSubmit={this.handleMessageSubmit} className="messages-form">
                            <h1>Chat Box</h1>
                            <br></br>
                            <label>Message</label>
                            <textarea onChange={this.handleOnChange} value={this.state.message} type="text" placeholder="Write your message..." id="message" required></textarea>
                            <input onChange={this.handleOnChange} value={this.state.coordinates} type="text" placeholder="Coordinates ..." id="coordinates"></input>
                            <input onChange={this.handleOnChange} value={this.state.temperature} type="text" placeholder="Temperature in °C" id="temperature"></input>
                            <input onChange={this.handleOnChange} value={this.state.species} type="text" placeholder="Species" id="species"></input>
                            <input onChange={this.handleOnChange} value={this.state.abundance} type="text" placeholder="Quantity of ..." id="abundance"></input>
                            <button type="submit" className="button-send">Send!</button>
                        </form>
                        <button className="button-exit" onClick={this.exitChat}>Exit Chatroom</button>
                    </div>
                :
                    <div>
                        You exited the chat. Come back soon!
                    </div>}
            </div>
        );
    }
}

export default ChatBox;