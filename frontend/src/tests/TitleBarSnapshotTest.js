import {ChatBox} from '../component/ChatBox';
import React from "react";
import socketIOClient from 'socket.io-client'


describe('ChatBox', () => {
    test('chatbox snapshot render', () => {
        const socket = socketIOClient('http://localhost:3000');
        const allUsers = {
        0: {createdAt: "2019-11-05T21:48:41.690Z",
            updatedAt: "2019-11-05T21:48:41.690Z",
            user: "adgd6m",
            __v: 0,
            _id: "5dc1ee39bfc9ec323092efc3"},
            1: {createdAt: "2019-11-05T21:54:49.364Z",
                updatedAt: "2019-11-05T21:54:49.364Z",
                user: "h351y",
                __v: 0,
                _id: "5dc1efa9bfc9ec323092efce"},
            2: {createdAt: "2019-11-06T12:12:55.294Z",
                updatedAt: "2019-11-06T12:12:55.294Z",
                user: "dvvv7",
                __v: 0,
                _id: "5dc2b8c7cd4c3e1f18bb1fdc"}
    };
        const component = renderer.create(<ChatBox socket={socket} name={'Andrea'} allUsers={allUsers}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});