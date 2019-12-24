import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css']
})
export class MiComponenteComponent implements OnInit {

  public titulo:String;
  public comentario:String;
  public year:Number;
  public mostrarPeliculas:boolean;
  constructor() {
    this.titulo="Hola mundo soy mi contructor";
    this.comentario="este es un comentario";
    this.year=2020;
    this.mostrarPeliculas=true;
    console.log(this.titulo);
   }

  ngOnInit() {
  }
  ocultarPeliculas(){
    this.mostrarPeliculas=false;
  }
}
