const express = require('express');

const routerProgramacion = express.Router();

const {programacion}= require('../datos/cursos').infoCursos;

//middleware
routerProgramacion.use(express.json());
//programacion

routerProgramacion.get('/', (req, res)=>{
    res.end(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje', (req, res)=>{
    const lenguaje =  req.params.lenguaje;
    const resultados = programacion.filter(curso=>curso.lenguage===lenguaje);

    if(resultados.length===0){
        return res.status(404).send(`curso de ${lenguaje} no encontrado`);
    }

    if(req.query.ordenar==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas-a.vistas)))
    }else{
            res.end(JSON.stringify(resultados));
    }
});

routerProgramacion.post('/', (req, res)=>{
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});



routerProgramacion.put('/:id', (req, res)=>{
    let cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso=>curso.id == id);
    
    if(indice>=0){
        programacion[indice]= cursoActualizado;
        res.send(JSON.stringify(programacion));
    }
    
});

routerProgramacion.patch('/:id', (req, res)=>{
    let infoActual = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso=>curso.id == id);
    
    if(indice>=0){
        const cursoModificar= programacion[indice];
        Object.assign(cursoModificar, infoActual); //actualiza solo el contenido nuevo
    }

    res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res)=>{
    const id = req.params.id;
    const indice = programacion.findIndex(curso=> curso.id == id);

    if(indice>=0){
        programacion.splice(indice, 1);
        
    }
    res.send(JSON.stringify(programacion));
});


module.exports= routerProgramacion; 