
// First import express, it can be assigned to a variable because
//the whole express package is actually a function
const express = require('express');

// Listening for incoming connections
const app = express();

// Listening at port 3000, and using a callback function to state that
// the operation is working fine
const server = app.listen(3000, () => {console.log('listening to port 3000...');});

// Importing the file system module from node
const fs = require('fs');

// 'data' is the content of the 'data.json' file, which is actually in a read in it's raw form.
// This data has to be parsed in order to become in json form
/*
// SYNC vs NO SYNC
What is the difference between 'readFile' and 'readFileSync'?
You can think of syncronous as being a 'blocking' line of code.
When you use the sync version, the next line of code won't start until
the sync operation has ended. This is what we ususally want when reading the contents of a file,
this also saves you from adding a callback.
However, if you want to perform read and write actions while the user is making an api request,
you should not use the sync version because it will lock up the server. 
*/
var data = fs.readFileSync('data/data.json');
var words = JSON.parse(data);

// Express has the ability to host static files, e.g. HTML, images, movies, etc..
// Note that 'website' is the folder where the static files are fetched,
// the standard is 'public'
app.use(express.static('website'));

// RESTful API //
/*
It stands for Representational State Transfer, it is a software architectural style.
It defines how users can make requests and send responses to the API.
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

// Sending a js object in express will be automatically transformed into a JSON
app.get('/words', (req, res)=>{
    res.send(words);
})

// This will work on postman, but in order to see it in the browser you have to use 'get'
// Beware that 'writeFile' is actually deleting the contents and rewriting it.
// We are using the async version, no need for sync here but we have a callback.
app.post('/add/:neword/:val', (req, res)=>{
    const word = req.params.neword;
    const value = req.params.val;
    words[word] = parseInt(value, 10);
    const data = JSON.stringify(words, null, 2);
    fs.writeFile('data/data.json', data, (err)=>{
        if(err) throw err;
        console.log('Writing to file...');
    });
    res.send(`Successfully added ${word}:${value}`)

})