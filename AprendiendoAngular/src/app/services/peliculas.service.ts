'use strict'
import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{

    holaMundo(){
        alert("hola mundo desde el servicio");
    }
    
}