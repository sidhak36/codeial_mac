
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const app = express();
const port = 8000;


//Use the static files(middleware)
app.use(express.static('./assets'));


//Use express ejs layouts(middleware)
app.use(expressLayouts);


//Use express router (middleware)
app.use('/', require('./routes/index'));


//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//Extract style(links) and scripts from sub pages(home, user_profile etc) into the layout file ejs
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Start the server
app.listen(port, function(err){
    if(err){
        console.log(`An error occured while starting server: ${err}`);
        return;
    }

    console.log(`Server started successfully at port: ${port}`);
});