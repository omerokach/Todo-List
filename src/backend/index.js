const uuid = require('uuid');
const { response } = require('express');
const express = require('express');
const fs = require('fs');
const { request } = require('http');
const app = express();
const PORT =3000;
app.use(express.json());

 // get all the objects
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
                res.status(200).send(files);
            } catch (error) {
                res.status(500).send('there is a problem with the server ' + error);
            }
        }
});

// get a specific object by id
app.get('/b/:id', (req,res) => {
    if(!fs.existsSync(`./src/backend/database/${req.params.id}.json`)){
        res.status(400).send(`{
            "message": "Invalid Bin Id provided"
        }`);
    }else {
        fs.readFile(`./src/backend/database/${req.params.id}.json` ,(err, data) =>{
        if(err){
            res.status(500).send('there is a problem with the server '+ err)
        } else{
            res.status(200).send(data);
        }
    })
    };
});

//update specific object by id
app.put('/b/:id', (req, res) =>{
    const {body} = req;
    body.id = req.params.id;
    if(!fs.existsSync(`./src/backend/database/${req.params.id}.json`)){
        res.status(400).send(`{
            "message": "Invalid Bin Id provided"
        }`);
    } else {
        fs.writeFile(`./src/backend/database/${req.params.id}.json`, JSON.stringify(body, null, 4), (err) =>{
        if(err){
            res.status(500).send('there is a problem with the server '+ err);
        } else{
            res.status(200).send(body);
        }
    })
    };
});

//creating new file with new object
app.post('/b', (req, res) =>{
    const {body} = req;
    const id = uuid.v4();
    if(Object.keys(body).length === 0){
        res.status(400).send(`{
            "message": "Bin cannot be blank"
        }`)
    }
    body.id = id;
    fs.writeFile(`./src/backend/database/${id}.json`, JSON.stringify(body, null, 4), (err) =>{
        if(err){
            res.status(500).send("there is a problem with the server "+err)
        } else{
            res.status(200).send(body);
        }
    });
});

//deleting specific file by id
app.delete('/b/:id', (req, res) =>{
    const id = req.params.id;
    fs.unlink(`./src/backend/database/${id}.json`, (err) =>{
        if(err){
            res.status(500).send('there is a problem with the server '+err);
        } else{
            res.status(200).send('success');
        }
    } );
 } );

 app.listen(PORT);
 console.log(`listening to ${PORT}`);