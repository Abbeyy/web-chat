import React from 'react';
import '../resources/sappo.css';
import axios from 'axios';

class ChatBox extends React.Component {
    state = {
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
            <div className="messages">
                    <div className="messages-container">
                        <form onSubmit={this.handleMessageSubmit} className="messages-form">
                            <h1 className="chat-title">Chat Box</h1>
                            <br/>
                            <label>Message</label>
                            <br/>
                            <textarea onChange={this.handleOnChange} value={this.state.message} type="text" placeholder="Write your message..." id="message" required></textarea>
                            <br/>
                            <input onChange={this.handleOnChange} value={this.state.coordinates} type="text" placeholder="Coordinates ..." id="coordinates"></input>
                            <br/>
                            <input onChange={this.handleOnChange} value={this.state.temperature} type="text" placeholder="Temperature in °C" id="temperature"></input>
                            <br/>
                            <input onChange={this.handleOnChange} value={this.state.species} type="text" placeholder="Species" id="species"></input>
                            <br/>
                            <input onChange={this.handleOnChange} value={this.state.abundance} type="text" placeholder="Quantity of ..." id="abundance"></input>
                            <br/>
                            <button type="submit" className="button-send">Send!</button>
                        </form>
                    </div>
            </div>
        );
    }
}

export default ChatBox;