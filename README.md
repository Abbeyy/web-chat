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
The frontend and backend of this application run concurrently when this command is used. You may choose to run them separately.
Go to http://localhost:3000 to view the app.

### npm run build
The app is built, ready for production, and placed into the 'build' folder.

### npm run test:watch
This command runs the applications tests and lets you view the outcome in the command line.

## Justification

HTTP and Websocket:<br/>
I use axios to preform ajax requests because it leads to cleaner code: the code axios allows me to produce is more concise and easily understandable. There is less of it, and so less chance I make mistakes when editing it because there is less to go wrong.
However, I use JavaScript's 'fetch' instead of using an axios get request because, although axios unpacks the response for me, fetch allows me to use a callback passed to the overall function (see UserGeneration.js 76-95, getDataFromDB). And so, for fluidity, whereever else I may have used an axios.get, I instead use fetch.
<br/>
<br/>
I use axios to put new messages into the database. When a message is created, it does not have an _id or a time of creation. But when a message is put into the database, this information is generated.
So, to update my components correctly with all this information, I would need to query the database and find the new message put into it, to then access the _id and time of creation, to then update state from the information the websocket receives, and so the component could rerender to show the new message.
This is very long-winded and not efficient.
Instead, I chose to re-use my existing method, getMessagesFromDB(), which queries the database for all messages (the new message has already been put in at this time),
and uses the query results to update state and rerender the component - and does not use the new-message information passed to the socket.
This is far more efficient and, as the user's of this chat may not have strong signals, more optimal solutions are key. (MessageList.js 18-25, ComponentDidMount())

Image / Multipart Content Type Messaging:<br/>
I tried to implement the ability to send messages over the chat application and got as far as to receive the image data in the node server. However, given more time I would have liked to finish this feature.
Given that this feature was incomplete by submission time, I decided to remove it by commenting out my code (showing what I did achieve) so that my end prototype had fully functioning features.

Testing:<br/>
I tried to implement Jest snapshot testing and created a file to identify whether the ChatBox component would render correctly. However, my test file failed and given more time I would have liked to explore this further so that my application can include snapshot tests and unit tests.
Testing is important because, with an ever-expanding and increasingly-complicated codebase, it is vital to ensure parts worked on time ago still function logically as expected.

## Usage


## Tests


## Paradigms 


## Styling
I incorporated React-Bootstrap into my project because it allowed me to create an application with a continuous style: in terms of colour, shapes and positioning of components and their elements.
I used my own CSS stylesheet on top of the Bootstrap dependency because it enabled me to show the dates and times of chat messages when the user hovers over the name of whoever sent said message.
This cuts down on the amount of information shown on the UI at any one time, ensuring the interface is kept clear of jargon and specific information, but which data is easy to find when the user wants it.

## License
[MIT License]



• how to build/start/run/compile the project
• details of any assumptions you have made
• details of any aspects you have mocked
• explanation of any paradigms used
• justification for styling of application