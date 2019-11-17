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
        researchdata: null,
        showResearchData: false,
        showResearchMessages: false
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
                            {!item.image ?
                            <span></span> :
                                <img className="rotate90" alt="Research image" height="75" width="90" src={item.image} />
                            }
                        </ListGroupItem>
                    );
                });
                let data = res.data.map(item => {
                    return {_id: item._id,
                    user: item.user,
                    createdAt: item.createdAt,
                    message: item.message,
                    image: item.image};
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
                    console.log(item);
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
                //here
                let researchdata = {};
                for (let x = 0; x < res.data.length; x++) {
                    if (!res.data[x].species in researchdata) {
                        researchdata.push({key: res.data[x].species, value: res.dara[x].abundance});
                    } else {
                        researchdata[res.data[x].species] = res.data[x].abundance;
                    }
                }
                let sorteddata = [];
                for(let species in researchdata) {
                    let abundance = researchdata[species];
                    sorteddata.push(
                        <ListGroupItem>
                            <p>{abundance} {species}s have been found</p>
                        </ListGroupItem>
                    );
                }
                this.setState({research: listItems});
                this.setState({researchdata: sorteddata})
            });
    };

    showResearchData = () => {
        this.setState({showResearchData: true});
    };

    closeResearchData = () => {
        this.setState({showResearchData: false});
    };

    showResearchMessages = () => {
        this.setState({showResearchMessages: true});
    };

    closeResearchMessages = () => {
        this.setState({showResearchMessages: false});
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
            {!this.state.showResearchData ?
                <button onClick={this.showResearchData}>Show Research Data</button>
                :
                <div>
                    <ListGroup id="data">
                        {this.state.researchdata ?
                        this.state.researchdata :
                        <ListGroupItem>
                            There's no data to show yet
                        </ListGroupItem>}
                    </ListGroup>
                    <button onClick={this.closeResearchData}>Close Research Data</button>
                </div>
            }
            {!this.state.showResearchMessages ?
                <button onClick={this.showResearchMessages}>Show Research Submission Messages</button>
                :
                <div>
                    <ListGroup id="messages">
                        {this.state.research ?
                            this.state.research
                            :
                            <ListGroupItem>No research yet</ListGroupItem>}
                    </ListGroup>
                    <button onClick={this.closeResearchMessages}>Close Research Messages</button>
                </div>
            }
        </div>);
    }
}

export default MessageList;