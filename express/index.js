const express = require('express');
const app= express();
const PUERTO=process.env.PORT || 3000;



const {infoCursos}= require('./datos/cursos.js');



//routers
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);



const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);



app.get('/', (req, res)=>{
    res.end("este es el inicio");
});



app.get('/api/cursos', (req, res)=>{
    res.end(JSON.stringify(infoCursos));
});



app.listen(PUERTO, ()=>{
    console.log("el servidor esta escuchando");
});