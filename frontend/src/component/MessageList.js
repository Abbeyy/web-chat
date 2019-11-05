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
                        <li className="messages-item" key={item._id}>
                            <div className="message-content">
                                <p className="tooltip">{item.user} said
                                    <span className="tooltip-datetime">{item.createdAt}</span>
                                </p>
                                <p>{item.message}</p>
                            </div>
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
            //Add new message locally for efficiency...

        });

        return (<div>
            <ul className="messages-list">
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