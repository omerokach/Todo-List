const uuid = require('uuid');
const { response } = require('express');
const express = require('express');
const fs = require('fs');
const { request } = require('http');
const app = express();
const PORT =3000;
app.use(express.json());

app.get('/b', (req, res) => {

})

app.get('/b/:id', (req,res) => {
    fs.readFile(`./src/backend/database/${req.params.id}.json` ,(err, data) =>{
        if(err){
            res.send('error')
        } else{
            res.send(data);
        }
    });
});

app.put('/b/:id', (req, res) =>{
    const {body} = req;
    body.id = req.params.id;
    fs.writeFile(`./src/backend/database/${req.params.id}.json`, JSON.stringify(body, null, 4), (err) =>{
        if(err){
            res.send('error');
        } else{
            res.send(body);
        }
    });
});

app.post('/b', (req, res) =>{
    const {body} = req;
    const id = uuid.v4();
    body.id = id;
    fs.writeFile(`./src/backend/database/${id}.json`, JSON.stringify(body, null, 4), (err) =>{
        if(err){
            res.send('error');
        } else{
            res.send(body);
        }
    });
});

app.delete('/b/:id', (req, res) =>{
    const id = req.params.id;
    fs.unlink(`./src/backend/database/${id}.json`, (err) =>{
        if(err){
            res.send('error');
        } else{
            res.send('success');
        }
    } );
 } );

 app.listen(PORT);
 console.log(`listening to ${PORT}`);