require("./models/User");
require("./models/Message");
require("./models/Hobby");
const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Global = require('./Global');

const basicRoutes = require("./routes/basicRoutes");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
const messageRoutes = require("./routes/messageRoutes");
const hobbyRoutes = require("./routes/hobbyRoutes");

const app = express();

//Please enter your MongoDB connection from the src/Global.js. I have created this app with the Cloud of Mongo DB.
// If you are using different configurations for your mongo connection please Edit them accordingly from the mongoose.connect function.
const mongoURI =MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => 
{
    console.log('Connected to mongo instance')
});
mongoose.connection.on('error', (err)=> 
{
    console.log('error',err)
});

app.use(bodyParser.json());

app.use(basicRoutes);
app.use(authRoutes);
app.use(friendRoutes);
app.use(messageRoutes);
app.use(hobbyRoutes);

app.listen('3000',() => 
{
    console.log("Hello Server is running at 3000");
});