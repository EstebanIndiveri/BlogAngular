'use strict'

//Modulos de node para server//
var express=require('express');
var bodyParser=require('body-parser');



//ejecutar express//
var app=express();

//cargar ficheros rutas//
var article_routes=require('./routes/article');

//Middlewares//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS peticiones desde front//
//middle que se ejecuta antes de cada peticion. next controla que cualquier cliente haga peticion.
//get, post,delete, agregar mas si es necesario?
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//añadir prefijos a rutas//Cargar rutas//
app.use('/api',article_routes);

// ruta de preuba
/*app.post('/probando', (req,res)=>{
    var hola=req.body.hola;
    return res.status(200).send({
        curso:"Master en framewors",
        año:2019,
        url:"estebanindiver.com",
        hola
    });
});*/


// exportar modulos (fichero actual)//
module.exports=app;
