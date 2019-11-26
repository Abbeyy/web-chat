import React from 'react';
import socketIOClient from 'socket.io-client'

import TitleBar from './component/TitleBar';
import Users from './component/UserGeneration';

class App extends React.Component {
    endpoint = 'http://localhost:3000';
    state = {
        socket: socketIOClient(this.endpoint)
    };
    render() {
        return(
            <div className="page">
                <TitleBar></TitleBar>
                <Users socket={this.state.socket}></Users>
            </div>
        );
    }
}

export default App;