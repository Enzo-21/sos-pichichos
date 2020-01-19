const {globalVariables} = require('./config/configuration');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars')
const app = express();
const {mongoDbUrl, port} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const {selectOption} = require('./config/customFunctions')
const fileUpload = require('express-fileupload');
const passport = require('passport');

/* Configuring mongoose  */
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(response => {
    console.log('MongoDB connected successfully');
    
}).catch(errors => {
    console.log('Databse connection failed');
    
});

/* Configure express middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Flash and Session */
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

/* Global Variables */
app.use(globalVariables);

/* File Upload Middleware */
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());


/* View engine */
app.engine('handlebars', hbs({
    defaultLayout: 'default',
    helpers: {select: selectOption}
}));
app.set('view engine', 'handlebars');


/* Method Override Middleware */
app.use(methodOverride('newMethod'));


// Static / Public
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
const defaultRoutes = require('./routes/default/defaultRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`);
});
