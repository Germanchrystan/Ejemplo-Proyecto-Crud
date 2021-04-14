const { Router } = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const router = Router();

const users = require("../MOCK_DATA.json");

// Realiza un GET a "/users/id" y obten el user de acuerdo a su id.
router.get("/users/:id", async (req, res) => {
    //Sacamos el id de params
    const {id} = req.params;
    //Buscamos el usuario cuyo id sea igual al que extrajimos del params
    const userFound = users.find((u)=>u.id===Number(id));
    //Si existe el usuario lo devolvemos con un código de protocolo 200
    if(userFound){
        return res.status(200).send(userFound);
    }
    //Si no existe el usuario devolvemos un 404 junto a un mensaje
    return res.status(404).json({msg:"No se ha encontrado el usuario"})
});

// Realiza un GET a "/users" y obten todos los users.
router.get("/users", async (req, res) => {
    try{
        return res.status(200).send(users);       
    } catch {
        return res.status(404).json({msg:"Ha habido un error"})
    }
});

// Realiza un POST a "/users" y crea un nuevo usuario.
router.post("/users", (req, res) => {
    if(req.body){
        const id = users.length + 1;
        const response = {id, ...req.body, password: uuidv4()};
        users.unshift(response);
        return res.status(200).json(users);
    }
    return res.sendStatus(404);
});

// Realiza un PUT a "/users" y actualiza un usuario.
router.put("/users/:id", (req, res) => {
    const {id} = req.params;

    const { firstName, lastName, email, password } = req.body;

    if(firstName && lastName && email && password){
        users.find((user) => {
            if(user.id === Number(id)){
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
        }
    });

    if (users[id]) {
        return res.status(200).json({msg: "El usuario se ha actualizado con exito"})
    }
    return res.status(404).json({msg:"Ha habido un error"})
    }

    return res.sendStatus(404);
});

// Realiza un PATCH a "/users" y actualiza parcialmente un nuevo comentario.
router.patch("/users/:id", (req, res) => {
    const {id} = req.params;

    const { firstName, lastName, email, password } = req.body;
    
        users.find((user) => {
            if(user.id === Number(id)){
                user.firstName = firstName ? firstName : user.firstName;
                user.lastName = lastName ? lastName : user.lastName;
                user.email = email ? email : user.email;
                user.password = password ? password : user.password;
            }
        });

    if (users[id]) {
        return res.status(200).json({msg: "El usuario se ha actualizado con exito"})
    }
    return res.status(404).json({msg:"Ha habido un error"})
});

// Realiza un DELETE a "/users" y borra comentario.
router.delete("/users/:id", (req, res) => {
    const {id} = req.params;

    let index = users.findIndex((user)=>user.id===Number(id));

    if(index !== -1){ 
        users.splice(index,1);
        return res.status(200).json({msg:"El usuario ha sido eliminado"})
    } 
    return res.status(404).json({msg:"El usuario no ha sido encontrado"});
});

module.exports = router;