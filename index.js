
const express = require('express');

const app = express();
const port = 8000;



app.listen(port, function(err){
    if(err){
        console.log(`An error occured while starting server: ${err}`);
        return;
    }

    console.log(`Server started successfully at port: ${port}`);
});