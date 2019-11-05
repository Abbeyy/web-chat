import React from 'react';
// import '../resources/sappo.css';
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class MessageList extends React.Component {
    state = {
        messages: null
    };

    constructor(props) {
        super(props);
        this.getMessagesFromDB = this.getMessagesFromDB.bind(this);
    }

    componentDidMount() {
        //get all messages from db -- no interval, done once...
        this.getMessagesFromDB();
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
                this.setState({messages: listItems});
            });
    }

    render() {
        this.props.socket.on('new message', (msg) => {
            //get messages from database...
            // console.log('Got new message! getting more out of db...');
            this.getMessagesFromDB();
            //Add new message locally for efficiency...

        });

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