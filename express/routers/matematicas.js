const express = require('express');

const routerMatematicas = express.Router();

const {matematicas}= require('../datos/cursos.js').infoCursos;



//matematicas
routerMatematicas.get('/', (req, res)=>{
    res.end(JSON.stringify(matematicas));
});

routerMatematicas.get('/:tema', (req, res)=>{
    const tema =  req.params.tema;
    const resultados = matematicas.filter(curso=>curso.tema===tema);

    if(resultados.length===0){
        return res.status(404).send(`curso de ${tema} no encontrado`);
    }

    res.end(JSON.stringify(resultados));
});

module.exports = routerMatematicas;