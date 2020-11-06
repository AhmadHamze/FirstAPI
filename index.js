// First import express, it can be assigned to a variable because
//the whole express package is actually a function
var express = require('express');

// Listening for incoming connections
var app = express();

// Listening at port 3000, and using a callback function to state that
// the operation is working fine
var server = app.listen(3000, () => {console.log('listening to port 3000...');});

// Express has the ability to host static files, e.g. HTML, images, movies, etc..
// Note that 'website' is the folder where the static files are fetched,
// the standard is 'public'
app.use(express.static('website'));

// RESTful API //
/*
It stands for Representational State Transfer, it is a software architectural style.
It defined how users can make requests and send responses to the API.
Instead of having directories in your code to allow the navigation of the site,
you can navigate using routes.
In the following example you can see a get request that links to a 'search' route.
Then there is a callback function with two parameters (request and response).
Whenever a user interacts with a website, the user is making a 'request' to the server,
which in turn sends back a response.
The ':object' signify that in the 'search' route, the user can enter a variable,
':num' is another variable. Notice that data will be displayed on the web page
despite that there is no html file to render it!
*/
app.get('/search/:object/:num', (req, res)=>{
    var data = req.params; //'object' is a parameter for the request
    var num = data.num; //'num' has to be reached this way, req.params.num
    var reply = "";
    for(var i=0; i<num; i++)
    {
        reply += `${data.object} is found`;
    }
    res.send(reply); //send back this 'reply'
} )