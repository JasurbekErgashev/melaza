<> Webpack packages require additional configuration to set up everything.
<> Therefore, I installed old versions of it, because of fast set up start configuration
<> Even though, this is not preferred solution :)

HTML 5 / for displaying content
CSS 3 / for styling
Bootstrap framework of CSS / custom buttons and container / grid layout
Canva / for image source and editing
Dribble / for design ideas

//Project lies under JavaScript and its frameworks :) //

NodeJS / for backend server
Express JS / child of NodeJS / makes it easy for get / post request

// Done so far
1. Html / CSS frontend design 
2. building Url routes / responding by 404 page for wrong url config
3. building Html template for products
4. FINALLY, creating custom-server API using data.js (object of arrays / info about products) to provide with products data in JSON file from server
5. Successfully setting up Webpack / main advantage is SPEED making all .js files one main.js in a browser [I spent 1 day :( lol] 



// planning
6. Creating other API server for detailed info for each product and getting that data from the server
7. adding rating / comment functionalities / mainly by stroring data of users
8. sign in and sign up pages / cart / checkout ones
9. and many more

// we will try to do as much as we can main point here is really understanding concepts

// used babel packages // transfers commonJS / ES5 to ES6 version of JavaScript 
// used nodemon for restarting server automatically when there are changes in the .js file

"webpack": "^4.43.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"



1. the problem that I faced is that 
net::ERR_SSL_PROTOCOL_ERROR

there is a difference between http and https request. My mistake is actually setting up API in http protocol. But I am requesting it from https protocol. 