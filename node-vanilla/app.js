const http = require("http");

const cursos = require("./cursos")

const servidor = http.createServer((req, res)=>{

    const {method}= req;

    switch(method){
        case "GET":
            return manejarSolicitudGet(req, res);
        case "POST":
            return manejarSolicitudPost(req, res);
        default:
            console.log(`metodo ${method} no manejado`)
    }

    res.end("hola mundo3");
})


function manejarSolicitudGet(req ,res){
    const path = req.url;

    if(path==="/"){
        res.statusCode=200;
        return res.end("welcome ")

    }else if(path==="/cursos"){
        res.statusCode=200;
        return res.end(JSON.stringify(cursos.infoCursos));

    }else if(path==="/cursos/programacion"){
        res.statusCode=200;
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    }

    res.statusCode=404;
    return res.end("no encontrado");
}


function manejarSolicitudPost(req, res){
    const path =req.url;

    if(path==="/cursos/programacion"){
    let cuerpo='';
    req.on('data', contenido=>{
        cuerpo+= contenido.toString();
    });

    req.on('end', ()=>{
        console.log(cuerpo);
        console.log(typeof cuerpo);

        cuerpo = JSON.parse(cuerpo);

        console.log(cuerpo.titulo);
        console.log(typeof cuerpo);

    })

    //return res.end("esta es una peticion post");

}

}





servidor.listen(1500, ()=>{
    console.log("el servido esta escuchando")
});

