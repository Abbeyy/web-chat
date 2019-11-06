import React from 'react';
// import '../resources/sappo.css';
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class MessageList extends React.Component {
    state = {
        messages: null,
        data: null,
        research: null,
        showResearch: false
    };

    constructor(props) {
        super(props);
        this.getMessagesFromDB = this.getMessagesFromDB.bind(this);
    }

    componentDidMount() {
        //get all messages from db -- no interval, done once...
        this.getMessagesFromDB();
        this.getResearchFromDB();

        this.props.socket.on('new message', (msg) => {
            this.getMessagesFromDB();
            this.getResearchFromDB();
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
    };

    getResearchFromDB = () => {
        fetch('http://localhost:3001/sappo/getResearch')
            .then((data) => data.json())
            .then((res) => {
                let listItems = res.data.map(item => {
                    return (
                        <ListGroupItem key={item._id}>
                            <p>{item.user} submitted
                                <br/>
                                Coordinates of find: {item.coordinates}
                                <br/>
                                Temperature at find: {item.temperature}
                                <br/>
                                Species found and how many: {item.species}, x{item.abundance}
                            </p>
                        </ListGroupItem>
                    );
                });
                this.setState({research: listItems});
            });
    };

    showResearch = () => {
        this.setState({showResearch: true});
    };

    closeResearch = () => {
        this.setState({showResearch: false});
    };

    render() {
        return (<div>
            <ListGroup id="messages">
                {this.state.messages ?
                    this.state.messages
                    :
                    <ListGroupItem>No messages yet</ListGroupItem>
                }
            </ListGroup>
            {!this.state.showResearch ?
                <button onClick={this.showResearch}>Show Research</button>
                :
                <div>
                    <ListGroup id="messages">
                        {this.state.research ?
                            this.state.research
                            :
                            <ListGroupItem>No research yet</ListGroupItem>}
                    </ListGroup>
                    <button onClick={this.closeResearch}>Close Research</button>
                </div>
            }
        </div>);
    }
}

export default MessageList;