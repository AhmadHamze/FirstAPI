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
app.use(express.static('website'))