
const express = require('express');

const app = express();
const port = 8000;

//Use express router (middleware)
app.use('/', require('./routes/index'));




app.listen(port, function(err){
    if(err){
        console.log(`An error occured while starting server: ${err}`);
        return;
    }

    console.log(`Server started successfully at port: ${port}`);
});