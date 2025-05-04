const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
app.use(cors())

app.get('/',(req,res)=>{
    res.sendFile('index.html', { root: __dirname }); // Corrected: 'index.html' as a string
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})