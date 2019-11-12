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





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


