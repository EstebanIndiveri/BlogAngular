import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import {Router, ActivatedRoute,Params } from "@angular/router";
import { Global } from "../../services/global";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers:[ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article:Article;
  public status:String;
  public is_edit:Boolean;
  public page_title:String;
  public url:String;
  
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
    this.is_edit=true;
    this.page_title="Editar articulo";
    this.url=Global.url;
  }
  ngOnInit() {
    this.getArticle();
  }
  onSubmit(){
    this._articleService.update(this.article._id, this.article).subscribe(
      Response=>{
        if(Response){
          this.article=Response.article;
               //alerta
          swal(
            'Articulo creado!!',
            'El articulo se ha creado correctamente',
            'success'
          );
          
          this._router.navigate(['blog/articulo',this.article._id]);
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
  getArticle(){
    this._route.params.subscribe(params=>{
      let id=params['id'];

      this._articleService.getarticle(id).subscribe(
        Response=>{
         if(Response.article){
           this.article=Response.article;
         }else{
           this._router.navigate(['/home']);
         }
        },
        error=>{
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    
    });
  }


}