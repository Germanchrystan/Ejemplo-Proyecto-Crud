const express = require("express");
const morgan = require("morgan");
const app = express();

const router = require("./routes");

// parsea el body aqui
app.use(express.json());

//CRUD - Create Read Update Delete

// morgan es un middleware de Express que nos permite ver en cosola los pedidos que realizamos
app.use(morgan("dev"));

app.use("/", router);

app.listen(3000, () =>
  console.log("¡Aplicación de ejemplo escuchando en el puerto 3000!")
);
