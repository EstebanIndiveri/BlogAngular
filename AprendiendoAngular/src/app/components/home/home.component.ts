import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ArticleService]
})
export class HomeComponent implements OnInit {
  public title:String;
  public articles:Article[];
  public url:String;
  constructor(
    private _articleService:ArticleService
  ) {
    this.title="Últimos articulos";
    
    this.url=Global.url;
   }

  ngOnInit() {
    this._articleService.getArticles().subscribe(
      Response=>{
        if(Response.articles){
          this.articles=Response.articles;
          console.log(this.articles)
        }else{
          console.log('error');
        }
      },
      error=>{
        console.log(error); 
      }
    );
  }

}
