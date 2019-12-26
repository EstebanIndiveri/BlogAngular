'use strict'
import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{

    public peliculas:Pelicula[];

    constructor(){
        this.peliculas=[
            new Pelicula("Spiderman 4","https://statics-uestudio.uecdn.es/buhomag/2019/07/lejosdecasa_editado-1.jpg", 'Acción, Sci-Fi,Superheroe',2019),
            new Pelicula("Avengers EndGame",'https://tecreview.tec.mx/wp-content/uploads/2019/04/avengers.jpg','Acción, Sci-Fi,Superheroe, Drama',2019),
            new Pelicula("Iron man 2", 'https://okdiario.com/img/2019/04/05/iron-man-2-mas-importante-y-mejor-de-lo-que-recordamos.jpg', 'Acción, Sci-Fi,Superheroe', 2010)
          ];
    }

    holaMundo(){
        console.log("hola mundo desde el servicio");
    }
    getPeliculas(){
        return this.peliculas;

    }
}