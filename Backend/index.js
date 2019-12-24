'use strict'

var mongoose =require('mongoose');
var app=require('./app')
var port=3900;
mongoose.set('useFindAndModify',false);
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest', { useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=>{
         console.log("La conexión a la base de datos correcta!");

         // Crear servidor y escuchar peticiones Http
        app.listen(port,()=>{
            console.log('servidor corriendo en htpp://localhost:'+port);
        });

});