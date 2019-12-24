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
    this.peliculas=[
      new Pelicula("Spiderman 4","https://statics-uestudio.uecdn.es/buhomag/2019/07/lejosdecasa_editado-1.jpg", 'Acción, Sci-Fi,Superheroe',2019),
      new Pelicula("Avengers EndGame",'https://tecreview.tec.mx/wp-content/uploads/2019/04/avengers.jpg','Acción, Sci-Fi,Superheroe, Drama',2019),
      new Pelicula("Iron man 2", 'https://okdiario.com/img/2019/04/05/iron-man-2-mas-importante-y-mejor-de-lo-que-recordamos.jpg', 'Acción, Sci-Fi,Superheroe', 2010)
    ]
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
