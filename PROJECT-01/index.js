const express = require('express');

const {logReqRes} = require("./middlewares")

const {connectMongoDb} = require('./connection');

const userRouter =  require('./routes/user');


const app = express();
//const port = 5000;
const port = process.env.PORT || 5000;

// Connection

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>
console.log("Mongodb connected!"));




// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));

app.get('/', (req, res) => res.send('Hello World!'));


//routes
app.use("/api/users", userRouter);


app.listen(port, () => console.log(`App listening on port ${port}!`));
