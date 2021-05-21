const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const db = mongoose.connection;

const PORT = 3500;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

mongoose.connect('mongodb+srv://user:', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on('error', function (err) {
    console.error("connection error;", err);
});
db.once('open', function () {

    friend.firstName = "Viktor";
    friend.lastName = 'Podevyn';
    friend.email = 'Viktor.Podevyn@becode.org';
    friend.phoneNumber = '0479190726';
    friend.codingLanguage = 'Javascript';
    friend.save().then(response => console.log(response,'friend saved'));
});

const friendSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    codingLanguage: String
});

const Friend = mongoose.model("Friend", friendSchema, "friends");
let friend = new Friend();

// Below you can define how your API handles a get or a post request.
// Try sending a get request to the root, you should get a "Hello from server" back.

app.get('/', function (request, response) {
    response.send('Hello from server');
});

app.post('/', function (request, response) {
    response.status(200).send({"message": "Data received"});
});


app.get('/allFriends', function (request, response) {
    Friend.find().then(allFriends => response.status(200).send(allFriends));
});

app.post('/addFriend', function (request, response) {
    const newFriend = Friend(request.body);
    newFriend.save().then(r => console.log(r, 'friend added'));
    response.status(200).send({"message": "Data received"});
});

app.post('/updateFriend', function (request, response) {
    Friend.find().then(allFriends => response.status(200).send(allFriends));
    Friend.updateOne().then(response => console.log(response,'friend updated'));
});

app.post('/deleteFriend', function (request, response){
    Friend.deleteOne({email: request.body.email}).then(r => console.log(r, 'friend deleted'));
    response.status(200).send({"message": "Data received"});
});

app.listen(PORT, function () {
});
