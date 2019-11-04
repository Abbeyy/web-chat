import React from 'react';
import ChatBox from './ChatBox';
import MessageList from './MessageList';

import axios from 'axios';
import '../resources/sappo.css';

class Users extends React.Component {
    state = {
        fetched: false,
        users: null, //get existing users from db,
        name: null,
        showChat: false,
        intervalIsSet: false,
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
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }

    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    setRemainingStates = () => {
        this.setState({fetched: true}, () => {
            let username = UserGenerator(this.state.users);
            this.setState({name: username});
        });
    }

    getDataFromDb = (callback) => {
        fetch('http://localhost:3001/api/getData')
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

    putDataToDB = (user) => {
        axios.post('http://localhost:3001/api/putData', {
            user: user,
        })
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });;
    };

    listUsers() {
        let userList = this.state.users.map((user, i) =>
            <li key={i}>{user}</li>
        );
        return (userList);
    }

    showChat() {
        //Update users in database to include this users name.
        this.putDataToDB(this.state.name);
        //Now show chat.
        this.setState({showChat: true});
    }

    render() {
        return(
            <div>
                {this.state.showChat
                    ? <div>
                        <MessageList socket={this.props.socket}></MessageList>
                        <ChatBox socket={this.props.socket} name={this.state.name} allUsers={this.state.data}></ChatBox>
                    </div>
                    : this.state.fetched ?
                            <div>
                                <ul>
                                    {this.state.users ? this.listUsers() : <li>No users yet</li>}
                                </ul>
                                <br></br>
                                <p className="users-text">Your username is: </p>
                                {this.state.name ?
                                    <div className="username">
                                        <p>{this.state.name}</p>
                                        <button onClick={this.showChat} className="chatroom-button">Enter Chatroom!</button>
                                    </div>
                                    : <p className="users-text">"name not gathered yet"</p>}
                            </div>
                            : <div>fetching names</div>}
            </div>

        );
    }

}
//
// class UserList extends React.Component {
//     state = {
//         user: null
//     }
//
//     constructor(props) {
//         super(props);
//     }
//
//     listUsers() {
//         let userList = this.props.users.map((user, i) =>
//             <li key={i}>{user}</li>
//         );
//         return (userList);
//     }
//
//     componentDidMount() {
//         let username = UserGenerator(this.props.users);
//         this.props.addNewUser(username);
//         this.setState({user: username});
//     }
//
//     render() {
//         return (
//             <div>
//                 <ul>
//                     {this.props.users ? this.listUsers() : <li>No users yet</li>}
//                 </ul>
//                 <p>Your username is: </p>
//                 <p>{this.state.user ? this.state.user : "name not gathered yet"}</p>
//             </div>
//         );
//     }
//
// }

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