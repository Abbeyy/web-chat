import React from 'react';
// import ChatBox from './component/ChatBox';
import '../resources/sappo.css';

class Users extends React.Component {
    state = {
        fetched: false,
        users: null, //get existing users from db,
        name: null
    };

    componentDidMount() {
        //get users from database.
        //mock users for now...
        this.setState({users: ['Claudia', 'Helene']}, () => {
            this.setState({fetched: true}, () => {
                let username = UserGenerator(this.state.users);
                this.setState({name: username});
                this.setState(prev => ({
                    users: [...prev.users, username]
                }));
            });
        });
    }

    listUsers() {
        let userList = this.state.users.map((user, i) =>
            <li key={i}>{user}</li>
        );
        return (userList);
    }

    render() {
        return(
            <div>
                {this.state.fetched ?
                    <div>
                        <ul>
                            {this.state.users ? this.listUsers() : <li>No users yet</li>}
                        </ul>
                        <br></br>
                        <p>Your username is: </p>
                        {this.state.name ?
                            <div>
                                <p>{this.state.name}</p>
                                <button>Enter chatroom</button>
                            </div>
                            : <p>"name not gathered yet"</p>}
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