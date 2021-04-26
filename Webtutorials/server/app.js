const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});

require('./db/conn');


app.use(express.json());
//we linkthe route files 
app.use(require('./router/auth'));

const PORT = process.env.PORT;

//middleware
const middleware = (req, res, next) => {
    console.log("Hello my middleware");
    next();
}

app.get('/', (req, res) => {
    res.send("Hello Guys, Welcome to Home1");
})

app.get('/about', middleware, (req, res, next) => {
    console.log("HELLO my About")
    res.send("Hello About, Welcome to About");
})

app.get('/contact', (req, res) => {
    res.send("Hello Guys, Welcome to Contact");
})

app.get('/signin', (req, res) => {
    res.send("Hello Guys, Welcome to Signin");
})

app.get('/register', (req, res) => {
    res.send("Hello Guys, Welcome to Signup");
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})