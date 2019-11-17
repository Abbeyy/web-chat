# Sappo

Sappo is a React application which uses JSX on the frontend and an npm server on the backend. Sappo is a real-time chat app.

## Installation

Download and unzip Sappo from the following GIT repository link: https://gitlab.cs.cf.ac.uk/c1714546/sappo
Or clone with the following:
HTTP: https://gitlab.cs.cf.ac.uk/c1714546/sappo.git
SSH: git@gitlab.cs.cf.ac.uk:c1714546/sappo.git

Next, enter into your projects root folder and install dependencies. 
npm install
cd frontend
npm install
cd ..
cd backend
npm install
cd ..

## Scripts

Ensure you are sat within your project's root folder (for example, this might be called sappo or sappo-master). Open up a command terminal here.

### npm start
The frontend and backend of this application run concurrently when this command is used. You may choose to run them separately.
Go to http://localhost:3000 to view the app.

### npm run build
The app is built, ready for production, and placed into the 'build' folder.

### npm run test:watch
This command runs the applications tests and lets you view the outcome in the command line.

## Justification
### Create-react-app:
I used CRA because it is a boilerplate/scaffolding of code to get you off the ground quickly. This assessment has allowed me to produce a small prototype of an application fulfilling pre-defined requirements, 
and CRA has enabled me to achieve this within a short, set time-limit. It comes with pre-defined dependencies which save me time exploring what I need and installing what I want before I can even create a functioning web application.
It is also very easy to manipulate, so it does not take long before the application starts to become what you want it to be. 
<br/>
<br/>
If I was creating a product for commercial release - not a prototype, I would choose to create my react app from the ground up without the use of a boilerplate. This would make my codebase far more lightweight as I would only include just what I needed for my application to function. This would become more important, the larger the application grows. In my case, it is not so, because my prototype is small.


### HTTP and Websocket:
I use axios to perform ajax requests because it leads to cleaner code: the code axios allows me to produce is more concise and easily understandable. There is less of it, and so less chance I make mistakes when editing it because there is less to go wrong.
However, I use JavaScript's 'fetch' instead of using an axios get request because, although axios unpacks the response for me, fetch allows me to use a callback passed to the overall function (see UserGeneration.js 76-95, getDataFromDB). And so, for fluidity, whereever else I may have used an axios.get, I instead use fetch.
<br/>
<br/>
I use axios to put a new client's message into the database. Then, my websocket is triggered with a message, via the socket.io library, and this is received by my server. Then, it is my server's duty to re-gather all messages from the database and rerender the app's components with this new data for all clients.
I do this because the alternative would be far more complex: when messages are displayed, they need an _id and a time of creation - but this data is only generated once the record is placed into the database. So, I would have to put the message in the database, 
then re-query the database for all messages, to then update the React component for my client - and then trigger a message on the web socket to update this change for all other clients. This is very inefficient and illogical. Hence, I chose the former implementation.
<br/>
<br/>
### Image / Multipart Content Type Messaging:
I tried to implement the ability to send messages over the chat application and got as far as to receive the image data in the node server. However, given more time I would have liked to finish this feature.
Given that this feature was incomplete by submission time, I decided to remove it by commenting out my code (showing what I did achieve) so that my end prototype had fully functioning features.

### Tests:
I tried to implement Jest snapshot testing and created a file to identify whether the ChatBox component would render correctly. However, my test file failed and given more time I would have liked to explore this further so that my application can include snapshot tests and unit tests.
Testing is important because, with an ever-expanding and increasingly-complicated codebase, it is vital to ensure parts worked on time ago still function logically as expected.
<br/>
<br/>
If you wish to test with my application, please run the following on the command-line:
npm run test:watch
<br/>
<br/>
Despite the set back I've explained above, I am going to explain why I wanted to use JEST with my application.
1. Jest is a fast testing framework. As explained by Sayfan, who says that it 'runs the slowest tests first'. (Sayfan, G. 2018. https://code.tutsplus.com/tutorials/8-things-that-make-jest-the-best-react-testing-framework--cms-30534 [Accessed: 17th November, 2019]). As my application is a small prototype, I don't have the time to wait for tests to complete because I am a one-person team with a strict-deadline that I must meet.
2. Jest is an extensible framework. Tal explains that Jest has a large range of matchers which cut down on code themselves and make your own codebase far more readable and thus more easily maintainable.  (Tal, L. 2018. https://medium.com/@liran.tal/reasons-to-love-jest-the-test-framework-ae19b49c02c3 [Accessed: 15th December, 2019]). This is important because it makes my own small prototype application able to be further condensed, especially since I've created it with a broad boilerplate (create react app). It also means that, as my application could extend, testing should become no more complex and test files should remain easily understandable and relatively small. 

### Paradigms 
In a sense, my React application is a type of object-oriented programming because each component I create and use is responsible for it's own data, and behaviour undertaken on such data.
<br/>
<br/>
Peter Hunt speaks in a video found here: https://www.youtube.com/watch?v=x7cQ3mrcKaY&feature=youtu.be&t=2m44s [Accessed: 17th November 2019], about React's paradigm being 'Separation of Concerns'. I like this paradigm and have tried to employ it throughout this application because it focuses on reducing the dependency between components [Coupling], and instead ensuring that they belong together - that they should be related [Cohesion]. 
<br/>
My components do not rely on other's to have a certain state or propoerty, but instead react upon one another's state or data to influence their own properties.

### Styling
I incorporated React-Bootstrap into my project because it allowed me to create an application with a continuous style: in terms of colour, shapes and positioning of components and their elements.
<br/>
<br/>
I used my own CSS stylesheet on top of the Bootstrap dependency because it enabled me to show the dates and times of chat messages when the user hovers over the name of whoever sent said message.
This cuts down on the amount of information shown on the UI at any one time, ensuring the interface is kept clear of jargon and specific information, but which data is easy to find when the user wants it.

## License
[MIT License]