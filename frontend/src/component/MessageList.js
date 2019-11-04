import React from 'react';
import '../resources/sappo.css';
import axios from 'axios';

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
                        <li>
                        <p>{item.user} said</p>
                        <br></br>
                        <p>{item.message}</p>
                    </li>
                    );
                });
                this.setState({messages: listItems},  () => {
                    console.log(this.state.messages);
                });
            });
    }

    render() {
        this.props.socket.on('new message', (msg) => {
            //get messages from database...
            console.log('Got new message! getting more out of db...');
            this.getMessagesFromDB();
            //or add new msg locally?...
        });

        return (<div>
            <ul>
                {this.state.messages ?
                    this.state.messages
                    :
                    <li>No messages yet</li>
                }
            </ul>
        </div>);
    }
}

export default MessageList;