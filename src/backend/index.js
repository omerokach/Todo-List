const uuid = require('uuid');
const { response } = require('express');
const express = require('express');
const fs = require('fs');
const { request } = require('http');
const app = express();
const PORT =3000;
app.use(express.json());

app.get('/b', (req, res) => {
    let files = [];
    const objects = fs.readdirSync('./src/backend/database');
    if(objects.length === 0){
        res.send('you have no objects');
    } else{
            try {
                for( let object of objects){
                    files.push(JSON.parse(fs.readFileSync(`./src/backend/database/${object}`)));
                }
                res.send(files);
            } catch (error) {
                res.send('you have an error' + error);
            }
        }
});

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