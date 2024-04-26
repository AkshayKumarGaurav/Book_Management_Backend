const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('./db');
const { userController } = require('./controller/user.routes');
const { booksController } = require('./controller/books.route');
const { authentication } = require('./auth_middleware/authentication');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/user', userController);

app.get('/', async (req,res) => {
    res.json({message : "Your books api is working fine for more update please read documentation"});
});

app.use(authentication);

app.use('/books', booksController);

app.listen(process.env.port || 8080, async () => {
    try {
        await connection;
        console.log("Connected to mongoDB");
    } catch(err) {
        console.log(err);
    }
    console.log(`server is running at ${process.env.port}`);
})

