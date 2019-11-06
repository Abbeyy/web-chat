import React from 'react';
// import '../resources/sappo.css';
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class MessageList extends React.Component {
    state = {
        messages: null,
        data: null
    };

    constructor(props) {
        super(props);
        this.getMessagesFromDB = this.getMessagesFromDB.bind(this);
    }

    componentDidMount() {
        //get all messages from db -- no interval, done once...
        this.getMessagesFromDB();

        this.props.socket.on('new message', (msg) => {
            this.getMessagesFromDB();
        });
    }

    getMessagesFromDB = () => {
        fetch('http://localhost:3001/sappo/getMessages')
            .then((data) => data.json())
            .then((res) => {
                let listItems = res.data.map(item => {
                    return (
                        <ListGroupItem key={item._id}>
                                <p id="tooltip">{item.user} said
                                    <br/>
                                    <span id="tooltip-datetime">{item.createdAt}</span>
                                    {item.message}
                                </p>
                        </ListGroupItem>
                    );
                });
                let data = res.data.map(item => {
                    return {_id: item._id,
                    user: item.user,
                    createdAt: item.createdAt,
                    message: item.message};
                });
                this.setState({messages: listItems});
                this.setState({data: data});
            });
    }

    render() {
        return (<div>
            <ListGroup id="messages">
                {this.state.messages ?
                    this.state.messages
                    :
                    <ListGroupItem>No messages yet</ListGroupItem>
                }
            </ListGroup>
        </div>);
    }
}

export default MessageList;