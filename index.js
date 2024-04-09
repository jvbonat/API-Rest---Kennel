const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const Dog = require('./database/Dog');
const connection = require('./database/database');
const cors = require('cors');
app.use(cors());

connection
.authenticate(()=>{
    console.log('Autentication has happenned successfully');
}).catch(error => {
    console.log('An error has ocurred '+ error);
});


app.post("/dog",(req,res)=>{
    const { name, weigth, age, breed} = req.body;
    if (typeof(name) !== 'string') {
        return res.status(400).json('Name must be a text.');
    }
    else if (!name) {
        return res.status(404).json('Name must be provided.');
    }
    else if (!weigth) {
        return res.status(400).json('Weigth must be provided.');
    }
    else if (!age) {
        return res.status(400).json('Age must be provided.');
    }
    else if (!breed) {
        return res.status(400).json('Breed must be provided.');
    }
    else if (typeof(breed) !== 'string') {
        return res.status(400).json('Breed must be a text.');
    }
    else if (typeof(weigth) !== 'number') {
        return res.status(400).json('Weight must be a number.');
    }
    else if(typeof(age) !== 'number') {
        return res.status(400).json('Age must be a number.');
    }
    else {
        Dog.create({ name, weigth, age, breed }
        ).then((dog) => {
            console.log(dog)
            return res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            return res.sendStatus(400);
        });
    }
});


app.get("/dog/:id",(req,res)=>{
    let id = req.params.id;
    if(!id || isNaN(id)) {
        return res.sendStatus(404);
    } else  {
        id = Number(id);
        Dog.findByPk(id).then(dog=>{
            if (dog) {
                console.log(dog);
                return res.status(200).json();
            } else {
                return res.sendStatus(404);
            }
        });
    }
});

app.delete("/dog/:id",(req,res)=>{
    let id = req.params.id;
    if(!id || isNaN(id)) {
        return res.sendStatus(404);
    } else {
        id = Number(id);
        Dog.destroy({
            where : {
                id : id
            }
        }).then(()=>{
            return res.sendStatus(200);
        }).catch(error=>{
            console.log(error)
            return res.sendStatus(404);
        });
    }
});

app.patch("/dog/:id",(req,res)=>{
    let id = req.params.id;
    const { weigth, name, age, breed } = req.body;
    if(!id || isNaN(id)) {
        return res.sendStatus(404);
    } else {
        Dog.update({weigth:weigth,name:name,age:age,breed:breed},{
            where : {
                id : id
            }
        }).then(()=>{
            return res.sendStatus(200);
        }).catch(error=>{
            console.log(error);
            return res.sendStatus(400);
        })
    }
})

app.get("/dogs",(req,res)=>{
    Dog.findAll({}).then(dogs => {
        if(dogs) {
            return res.status(200).json(dogs);
        } else {
            return res.sendStatus(404);
        }
    }).catch(error=>{
        console.log(error);
        return res.sendStatus(400);
    })
});


app.get("/",(req,res)=>{
    res.send('Aplicação rodando');
})


app.listen(4040,()=>{
    console.log('Application running on 4040');
});