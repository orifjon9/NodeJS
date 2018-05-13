var express = require('express');
var app = express();

// home page
app.get('/', (request, response) => {
    response.send('Hi there!');
});

// run app
app.listen(3000, () => console.log('App is listening on port 3000'));