# Sappo

Sappo is a React application which uses JSX on the frontend and an npm server on the backend. Sappo is a real-time chat app.


## Installation

Download and unzip Sappo from the following GIT repository link: https://gitlab.cs.cf.ac.uk/c1714546/sappo
Or clone with the following:
HTTP: https://gitlab.cs.cf.ac.uk/c1714546/sappo.git
SSH: git@gitlab.cs.cf.ac.uk:c1714546/sappo.git

Next, install dependencies. 
cd sappo
npm install
cd frontend
npm install
cd ..
cd backend
npm install
cd ..

## Scripts

Ensure you are sat within your sappo folder. Open up a command terminal here.

### npm start

### npm run build

### npm test

## Justification

HTTP and Websocket:
I use axios to preform ajax requests because it leads to cleaner code: the code axios allows me to produce is more concise and easily understandable. There is less of it, and so less chance I make mistakes when editing it because there is less to go wrong.
However, I use JavaScript's 'fetch' instead of using an axios get request because, although axios unpacks the response for me, fetch allows me to use a callback passed to the overall function (see UserGeneration.js 76-95, getDataFromDB). And so, for fluidity, whereever else I may have used an axios.get, I instead use fetch.

I use axios to put new messages into the database. When a message is created, it does not have an _id or a time of creation. But when a message is put into the database, this information is generated.
So, to update my components correctly with all this information, I would need to query the database and find the new message put into it, to then access the _id and time of creation, to then update state from the information the websocket receives, and so the component could rerender to show the new message.
This is very long-winded and not efficient.
Instead, I chose to re-use my existing method, getMessagesFromDB(), which queries the database for all messages (the new message has already been put in at this time),
and uses the query results to update state and rerender the component - and does not use the new-message information passed to the socket.
This is far more efficient and, as the user's of this chat may not have strong signals, more optimal solutions are key. (MessageList.js 18-25, ComponentDidMount())

## Usage


## Tests

## License
[MIT License]



• how to build/start/run/compile the project
• details of any assumptions you have made
• details of any aspects you have mocked
• explanation of any paradigms used
• justification for styling of application

