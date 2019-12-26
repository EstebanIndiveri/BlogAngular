import { Component, OnInit,DoCheck,OnDestroy } from '@angular/core';
import { Pelicula } from "../../models/pelicula";
import { PeliculaService } from "../../services/peliculas.service";

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers:[PeliculaService]
  
})
export class PeliculasComponent implements OnInit {
  
  public titulo:String;
  public peliculas:Pelicula[];
  public favorita:Pelicula;

  constructor(
    private _peliculaservice:PeliculaService
  ) {
    this.peliculas=this._peliculaservice.getPeliculas();
    this.titulo="componente peliculas";
   }

  ngOnInit() {
    console.log(this.peliculas);
    console.log(this._peliculaservice.holaMundo());
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log("docheck")
  }
  cambiarTitulo(){
    this.titulo="El titulo ha sido cambiado";
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log("el componente se va a eliminar")
}
mostrarFavorita(event){
this.favorita=event.pelicula;
}

}
