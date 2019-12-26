import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import {Router, ActivatedRoute,Params } from "@angular/router";
import { Global } from "../../services/global";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers:[ArticleService]
})
export class ArticleNewComponent implements OnInit {
  public article:Article;
  public status:String;
  public page_title:String;
  
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:Global.url+'upload-image',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para el articulo',
      afterUploadMsg_success: 'Imagen cargada correctamente !',
      afterUploadMsg_error: 'Error en la carga !'
    }
};


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _articleService:ArticleService
  ) { 
    this.article= new Article('','','',null,null);
    this.page_title="Crear Articulo"
  }

  ngOnInit() {
  }

  onSubmit(){
    this._articleService.create(this.article).subscribe(
      Response=>{
        if(Response){
          this.article=Response.article;
          //alerta
          swal(
            'Articulo creado!!',
            'El articulo se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/blog'])
          console.log(Response);
        }else{
          this.status='error';
        }
      },
      error=>{
        console.log(error);
        this.status='error';
      }
    );
  }

  imageUpload(data){
    let image_data=JSON.parse(data.response);
    this.article.image=image_data.image;
  }

}
