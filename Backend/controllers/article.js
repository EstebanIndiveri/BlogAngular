'use strict'
var validator=require('validator');
var Article=require('../models/article');
var fs=require('fs');
var path=require('path');


var controller ={

    datosCurso:(req,res)=>{
        var hola=req.body.hola;
        return res.status(200).send({
            curso:"Master en framewors",
            año:2019,
            url:"estebanindiver.com",
            hola
        });
    },

    test:(req, res)=>{
        return res.status(200).send({
            message:"soy la acción test de mi controlador de articulos"
        });
    },

    save:(req,res)=>{
       
            // recoger los parametros por post
            var params = req.body;
            console.log(params);
            // valida datos con VALIDATOR.
            try{
                var validate_title=!validator.isEmpty(params.title);
                var validate_content=!validator.isEmpty(params.content);

            }catch(err){
                return res.status(200).send({
                    status:'error',
                    message:'faltan datos por enviar'
                });
            }
        if(validate_content && validate_content){
            // return res.status(200).send({
            //     message:'validación correcta'
            // });

            //Crea objeto a guardar
            var article =new Article();

            //Asigna los valores al objeto
            article.title=params.title;
            article.content=params.content;
            if(params.image){
                article.image=params.image;
            }else{
                article.image=null;
            }
            //Guarda el articulo
            article.save((err,articleStored)=>{

                if(err || !articleStored){
                    return res.status(404).send({
                        status:'error',
                        message:'El articulo no se ha guardado!!'
                    });
                }
                //Devuelve la respuesta ocasionada
                return res.status(200).send({
                    status:'sucess',
                    article:articleStored
                });
            });
            
           
        }else{
            return res.status(200).send({
                status:'error',
                message:'los datos no son validos !!'   
            });
        }

    },

    getArticles:(req, res)=>{
        var last=req.params.last;
        var query=Article.find({});
        if(last || last != undefined){
            //limita el numero de buscados
            query.limit(5);

        }
        //find db .sort(-_id me los ordena de mas viejo a mas nuevo)
        query.sort('-_id').exec((err,articles)=>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al encontrar el articulo'   
                });
            }
            if(!articles){
                return res.status(404).send({
                    status:'error',
                    message:'No hay articulos para mostrar'   
                });
            }

            return res.status(200).send({
                /*status:'sucess',*/
                articles   
            });
        });

        
    },
getArticle: (req, res) => {

        // Recoger el id de la url
        var articleId = req.params.id;

        // Comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }

        // Buscar el articulo
        Article.findById(articleId, (err, article) => {
            
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo !!!'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });

        });
    },

    update: (req, res) => {
        // Recoger el id del articulo por la url
        var articleId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_title && validate_content){
             // Find and update
             Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
             });
        }else{
             // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }
       
    },
    delete:(req,res)=>{
        //recoger el id de la url
        var articleId=req.params.id;
        // hacer un find and deleted
        Article.findOneAndDelete({_id:articleId},(err,articleRemoved)=>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al borrar !!!'
                });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no exista !!!'
                });
            }
            return res.status(200).send({
                status: 'sucess',
                article:articleRemoved
            });

        });

    },
    upload:(req,res)=>{
        //configurar el modulo de MULTIPARTY UWU router/article.js (ROUTER)

        //Recoger el fichero de petición
        var fileName='imagen no subida';
        
        if (!req.files){
            return res.status(404).send({
                status:'error',
                message:fileName
            });
        }

        //Conseguir el nombre y la extensión de la imagen
        var filePath=req.files.file0.path;
        var fileSplit=filePath.split('\\')

        //* linux mac  \\ => // */

        //nombre del archivo
        var file_name=fileSplit[2];

        // extensión del fichero

        var extension_split=file_name.split('.');
        var file_ext=extension_split[1];
        //comprobar la extensión solo imgs sino es valida borra el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            //borrar el archivo subido
            fs.unlink(filePath, (err)=>{
                return res.status(200).send({
                    status:'error',
                    message:'la extensión no es valida'
                });
            })
        }else{
             //Si es valida 
            var articleId=req.params.id;

            if(articleId){
                // Buscar el articulo, asigarle el nombre de la imagen y actualizarlo
                Article.findOneAndUpdate({_id: articleId},{image:file_name},{new:true},(err,articleUpdated)=>{
                    if(err || !articleUpdated){
                        return res.status(200).send({
                            status:'error',
                            message:'Error al guardar la imagen de articulo'
                        });
                    }
    
                    return res.status(200).send({
                        status:'sucess',
                        article:articleUpdated
                    });
                });
            }else{
                return res.status(200).send({
                    status:'sucess',
                    image:file_name
                });
            }
            
           

        }
        
    }, // end upload file

    getImage:(req,res)=>{
        var file=req.params.image;
        var pathFile='./upload/articles/'+file;

        fs.exists(pathFile,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(404).send({
                    status:'err'
                });
            }
        })

    },

    search:(req,res)=>{
        //sacar el string a buscar
        var searchString=req.params.search;

        //find or 
        Article.find({ "$or":[
            {"title":{"$regex":searchString,"$options":"i"}},
            {"content":{"$regex":searchString,"$options":"i"}}
        ]})
        .sort([['date','descending']])
        .exec((err,articles)=>{
            if(err){
                return res.status(500).send({
                    status:'err',
                    message:'error en la peticion'
                });
            }
            if(!articles || articles.length<=0){
                return res.status(404).send({
                    status:'err',
                    message:'no hay articulos que coincidan'
                });
            }

            return res.status(200).send({
                status:'sucess',
                articles
            });
        })

        
    }

};
module.exports=controller;