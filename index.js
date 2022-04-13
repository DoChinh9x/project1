
const express = require('express');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
//import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const questionRoute = require('./routes/question.route');
//connect to DB
db.connect();

//MidleWare
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Router Middleware
app.use('/',authRoute);
app.use('/user/post',postRoute);
app.use('/user',userRoute);
app.use('/question',questionRoute);

app.listen(4000, ()=> console.log('Server up'))