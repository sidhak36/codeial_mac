
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const User = require('./models/userSchema');
const app = express();
const port = 8000;

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//Use the urlencoded parser
app.use(express.urlencoded());

//Tell the app to use cookie parser
app.use(cookieParser());


//Use the static files(middleware)
app.use(express.static('./assets'));


//Use express ejs layouts(middleware)
app.use(expressLayouts);

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//Use express router (middleware) Any request path will be sent to routes directory to map a controller
app.use(require('./routes/index'));


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