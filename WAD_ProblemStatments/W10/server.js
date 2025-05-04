const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.get('/api/getdata',(req,res)=>{
    const response = fs.readFileSync(path.join(__dirname,'tasks.json'));
    const data = JSON.parse(response);
    res.json(data);
})

app.post('/api/addtask',(req,res)=>{
    const {task} = req.body;
    const response = fs.readFileSync(path.join(__dirname,'tasks.json'));
    const data = JSON.parse(response);
    data.push(task);
    fs.writeFileSync(path.join(__dirname,'tasks.json'),JSON.stringify(data));
    res.json(data);
})

app.post('/api/deletetask',(req,res)=>{
    const {index} = req.body;
    const response = fs.readFileSync(path.join(__dirname,'tasks.json'));
    const data = JSON.parse(response);
    data.splice(index,1);
    fs.writeFileSync(path.join(__dirname,'tasks.json'),JSON.stringify(data));
    res.json(data);
}
);

app.post('/api/edittask',(req,res)=>{
    const {index,task} = req.body;
    const response = fs.readFileSync(path.join(__dirname,'tasks.json'));
    const data = JSON.parse(response);
    data[index] = task;
    fs.writeFileSync(path.join(__dirname,'tasks.json'),JSON.stringify(data));
    res.json(data);
}
);

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})