import React from 'react';
import '../resources/sappo.css';
import axios from 'axios';
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";

class ChatBox extends React.Component {
    state = {
        name: null,
        message: "",
        coordinates: "",
        temperature: "",
        species: "",
        abundance: 0
        // image: null
    }

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        // this.handleImageOnChange = this.handleImageOnChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.state.name = this.props.name;
    }

    handleOnChange(e) {
        this.setState({[e.target.id]: e.target.value});
    };

    handleImageOnChange(e) {
        this.setState({[e.target.id]: e.target.files[0]}); //will only be 1 upload
    };

    handleMessageSubmit(e) {
        e.preventDefault();

        let sendM = this.sendMessage;

        axios.post('http://localhost:3001/sappo/putMessage', {
            user: this.state.name,
            message: this.state.message
        })
            .then(function (resp) {
                console.log(resp);
                sendM();
            })
            .catch(function (err) {
                console.log(err);
            });

        axios.post('http://localhost:3001/sappo/putResearch', {
            user: this.state.name,
            coordinates: this.state.coordinates,
            temperature: this.state.temperature,
            species: this.state.species,
            abundance: this.state.abundance
        }).then(function (resp) {
            console.log(resp);
        })
            .catch(function (err) {
                console.log(err);
            });

    }

    sendMessage = () => {
        this.props.socket.emit('new message',
            {message: this.state.message,
                user: this.state.name,
                coordinates: this.state.coordinates,
                temperature: this.state.temperature,
                species: this.state.species,
                abundance: this.state.abundance
                // image: this.state.image
        });
    };

    render() {
        return (
            <div  id="col-sm">
                <br/>
                        <Form onSubmit={this.handleMessageSubmit} className="messages-form">
                            <FormGroup>
                                <h3>Chat Box</h3>
                                <br/>
                            </FormGroup>
                            <FormGroup>
                                <h4>Message</h4>
                                <br/>
                                <FormControl onChange={this.handleOnChange} value={this.state.message} type="text" placeholder="Write your message..." id="message" required></FormControl>
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <FormControl onChange={this.handleOnChange} value={this.state.coordinates} type="text" placeholder="Coordinates ..." id="coordinates"></FormControl>
                                <br/>
                                <FormControl onChange={this.handleOnChange} value={this.state.temperature} type="text" placeholder="Temperature in °C" id="temperature"></FormControl>
                                <br/>
                                <FormControl onChange={this.handleOnChange} value={this.state.species} type="text" placeholder="Species" id="species"></FormControl>
                                <br/>
                                <FormControl onChange={this.handleOnChange} value={this.state.abundance} type="text" placeholder="Quantity of ..." id="abundance"></FormControl>
                                <br/>
                                {/*<input onChange={this.handleImageOnChange} type="file" id="image" accept="image/png"></input>*/}
                                {/*<br/>*/}
                            </FormGroup>
                            <Button type="submit" variant="success">Send!</Button>
                        </Form>
                <br/>
            </div>
        );
    }
}

export default ChatBox;