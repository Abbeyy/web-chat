import React from 'react';
import socketIOClient from 'socket.io-client'

import TitleBar from './component/TitleBar';
import Users from './component/UserGeneration';

class App extends React.Component {
    //Create state values
    endpoint = 'http://localhost:3000';
    state = {
        endpoint: this.endpoint, //pointing to react frontend, which forwards it to server port from proxy in package.json
        colour: 'white',
        socket: socketIOClient(this.endpoint)
    };
    //
    // constructor(props) {
    //     super(props);
    // }

    send = () => {
        this.state.socket.emit('change colour', this.state.colour);
    };

    setColor = (color) => {
        this.setState({ colour: color });
    };

    componentDidMount = () => {
        setInterval(this.send(), 1000);
        this.state.socket.on('change colour', (col) => {
            document.body.style.backgroundColor = col
        })
    };

    render() {
        this.state.socket.on('change colour', (col) => {
            document.body.style.backgroundColor = col
        });

        return(
            <div className="page">
                <TitleBar></TitleBar>
                <Users socket={this.state.socket}></Users>
                {/*<button onClick={() => this.send() }>Change Colour</button>*/}
            </div>
        );
    }
}

// class App extends Component {
//     // initialize our state
//     state = {
//         data: [],
//         id: 0,
//         user: null,
//         intervalIsSet: false,
//         idToDelete: null,
//         idToUpdate: null,
//         objectToUpdate: null,
//     };
//
//     // when component mounts, first thing it does is fetch all existing data in our db
//     // then we incorporate a polling logic so that we can easily see if our db has
//     // changed and implement those changes into our UI
//     componentDidMount() {
//         this.getDataFromDb();
//         if (!this.state.intervalIsSet) {
//             let interval = setInterval(this.getDataFromDb, 1000);
//             this.setState({ intervalIsSet: interval });
//         }
//     }
//
//     // never let a process live forever
//     // always kill a process everytime we are done using it
//     componentWillUnmount() {
//         if (this.state.intervalIsSet) {
//             clearInterval(this.state.intervalIsSet);
//             this.setState({ intervalIsSet: null });
//         }
//     }
//
//     // just a note, here, in the front end, we use the id key of our data object
//     // in order to identify which we want to Update or delete.
//     // for our back end, we use the object id assigned by MongoDB to modify
//     // data base entries
//
//     // our first get method that uses our backend api to
//     // fetch data from our data base
//     getDataFromDb = () => {
//         fetch('http://localhost:3001/api/getData')
//             .then((data) => data.json())
//             .then((res) => this.setState({ data: res.data }));
//     };
//
//     // our put method that uses our backend api
//     // to create new query into our data base
//     putDataToDB = (user) => {
//         let currentIds = this.state.data.map((data) => data.id);
//         let idToBeAdded = 0;
//         while (currentIds.includes(idToBeAdded)) {
//             ++idToBeAdded;
//         }
//
//         axios.post('http://localhost:3001/api/putData', {
//             id: idToBeAdded,
//             user: user,
//         });
//     };
//
//     // our delete method that uses our backend api
//     // to remove existing database information
//     deleteFromDB = (idTodelete) => {
//         parseInt(idTodelete);
//         let objIdToDelete = null;
//         this.state.data.forEach((dat) => {
//             if (dat.id == idTodelete) {
//                 objIdToDelete = dat._id;
//             }
//         });
//
//         axios.delete('http://localhost:3001/api/deleteData', {
//             data: {
//                 id: objIdToDelete,
//             },
//         });
//     };
//
//     // our update method that uses our backend api
//     // to overwrite existing data base information
//     updateDB = (idToUpdate, updateToApply) => {
//         let objIdToUpdate = null;
//         parseInt(idToUpdate);
//         this.state.data.forEach((dat) => {
//             if (dat.id == idToUpdate) {
//                 objIdToUpdate = dat._id;
//             }
//         });
//
//         axios.post('http://localhost:3001/api/updateData', {
//             id: objIdToUpdate,
//             update: { user: updateToApply },
//         });
//     };
//
//     // here is our UI
//     // it is easy to understand their functions when you
//     // see them render into our screen
//     render() {
//         const { data } = this.state;
//         return (
//             <div>
//                 <ul>
//                     {data.length <= 0
//                         ? 'NO DB ENTRIES YET'
//                         : data.map((dat) => (
//                             <li style={{ padding: '10px' }} key={data.user}>
//                                 <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
//                                 <span style={{ color: 'gray' }}> data: </span>
//                                 {dat.user}
//                             </li>
//                         ))}
//                 </ul>
//                 <div style={{ padding: '10px' }}>
//                     <input
//                         type="text"
//                         onChange={(e) => this.setState({ user: e.target.value })}
//                         placeholder="add something in the database"
//                         style={{ width: '200px' }}
//                     />
//                     <button onClick={() => this.putDataToDB(this.state.user)}>
//                         ADD
//                     </button>
//                 </div>
//                 <div style={{ padding: '10px' }}>
//                     <input
//                         type="text"
//                         style={{ width: '200px' }}
//                         onChange={(e) => this.setState({ idToDelete: e.target.value })}
//                         placeholder="put id of item to delete here"
//                     />
//                     <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
//                         DELETE
//                     </button>
//                 </div>
//                 <div style={{ padding: '10px' }}>
//                     <input
//                         type="text"
//                         style={{ width: '200px' }}
//                         onChange={(e) => this.setState({ idToUpdate: e.target.value })}
//                         placeholder="id of item to update here"
//                     />
//                     <input
//                         type="text"
//                         style={{ width: '200px' }}
//                         onChange={(e) => this.setState({ updateToApply: e.target.value })}
//                         placeholder="put new value of the item here"
//                     />
//                     <button
//                         onClick={() =>
//                             this.updateDB(this.state.idToUpdate, this.state.updateToApply)
//                         }
//                     >
//                         UPDATE
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//}

export default App;