import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public user:any;
  public campo:string;
  constructor() {
    this.user={
      name:'',
      lastname:'',
      coment:'',
      genero:''
    };
   }

  ngOnInit() {
  }
  onSubmit(){
    alert("formulario enviado")
    console.log(this.user)
  }
hasSalido(){
  alert("saliste");
}
}
