import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article";
import { Router, ActivatedRoute,Params } from "@angular/router";
import { Global } from 'src/app/services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[ArticleService]
})
export class ArticleComponent implements OnInit {
  public article:Article;
  public url:String;
  constructor(
    private _articleService:ArticleService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.url=Global.url;
  }

  ngOnInit() {
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

  delete(id){
    swal({
      title: "¿Estas seguro?",
      text: "Una vez eliminado no podras recuperarlo",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this._articleService.delete(id).subscribe(
          response=>{
            swal("Poof! El articulo ha sido borrado!", {
              icon: "success",
            });
          this._router.navigate(['/blog']);
          },
          error=>{
            console.log(error);
            this._router.navigate(['/blog']);
          }
        )
        
      } else {
        swal("El articulo se encuentra a salvo!");
      }
    });

    
  };

}
