import React from 'react';
import ChatBox from './ChatBox';
import MessageList from './MessageList';

import axios from 'axios';
import '../resources/sappo.css';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";


class Users extends React.Component {
    state = {
        exitChat: false,
        fetched: false,
        users: null, //get existing users from db,
        name: null,
        showChat: false,
        data: null
    };

    constructor(props) {
        super(props);
        this.showChat = this.showChat.bind(this);
        this.getDataFromDb = this.getDataFromDb.bind(this);
    }

    componentDidMount() {
        //get users from database.
        this.getDataFromDb(true);
    }

    exitChat = () => {
        let objIdToDelete = null;
        this.state.data.forEach((data) => {
            if (data.user == this.state.name) {
                objIdToDelete = data._id;
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

    setRemainingStates = () => {
        this.setState({fetched: true}, () => {
            let username = UserGenerator(this.state.users);
            this.setState({name: username});
        });
    }

    getDataFromDb = (callback) => {
        fetch('http://localhost:3001/sappo/getData')
            .then((data) => data.json())
            .then((res) => {
                let usernames = [];
                res.data.map(item => {
                    usernames.push(item.user);
                });
                if (callback) {
                    //First-ever call to surrounding function. Ensuring this.state.users is set
                    //before generating a username that doesnt already exist in this state value.
                    this.setState({users: usernames}, () => {
                        this.setRemainingStates();
                    });
                } else {
                    //Used for further interval calls of surrounding function. After first-ever function call.
                    this.setState({users: usernames});
                }
                this.setState({data: res.data});
            });
    };

    putDataInDB = (user) => {
        axios.post('http://localhost:3001/sappo/putData', {
            user: user,
        })
            .then(function (resp) {
            console.log(resp);
        })
            .catch(function (err) {
                console.log(err);
            });;
    };

    listUsers() {
        let userList = this.state.users.map((user, i) =>
            <ListGroupItem id="users" key={i}>{user}</ListGroupItem>
        );
        return (userList);
    }

    showChat() {
        //Update users in database to include this users name.
        this.putDataInDB(this.state.name);
        //Now show chat.
        this.setState({showChat: true});
    }

    render() {
        return(
            <Jumbotron  id="centred">
                {!this.state.exitChat ?
                    this.state.showChat
                            ? <div>
                                <MessageList socket={this.props.socket}></MessageList>
                                <ChatBox socket={this.props.socket} name={this.state.name} allUsers={this.state.data}></ChatBox>
                                <button className="button-exit" onClick={this.exitChat}>Exit Chatroom</button>
                            </div>
                            : this.state.fetched ?
                                <div  id="centred">
                                    <ListGroup id="users-list">
                                        {this.state.users ? this.listUsers() : <ListGroupItem id="users">No users yet</ListGroupItem>}
                                    </ListGroup>
                                    <br></br>
                                    <p className="users-text">Your username is: </p>
                                    {this.state.name ?
                                        <div className="username">
                                            <p>{this.state.name}</p>
                                            <button onClick={this.showChat} className="chatroom-button">Enter Chatroom!</button>
                                        </div>
                                        : <p className="users-text">"name not gathered yet"</p>}
                                </div>
                                : <div>fetching names</div>
                :
                <div>
                    You exited the chat. Come back soon!
                </div>

                }

            </Jumbotron>

        );
    }

}

function UserGenerator (existingUsers) {
    let rando =  Math.random().toString(36).substring(7); //random sting of length
    if (rando in  existingUsers) {
        UserGenerator(existingUsers);
    } else {
        return rando;
    }
}

export default Users;

//display list of existing users on the chat
//choose a name which doesnt already exist
//if it does, choose again.
//if not, allow connection and store name in db.

//enable a quit chat button to exit room.  this removes name from db.