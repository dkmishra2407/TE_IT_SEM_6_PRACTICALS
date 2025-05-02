const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const dbconfig = require('./dbconfig/dbconfig.js');

const songroutes = require('./routes/songs.js');
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to the song API"
    });
});

app.use('/api', songroutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})