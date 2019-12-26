import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers:[ArticleService]
})
export class BlogComponent implements OnInit {

  public articles:Article[];
  public url:String;
  constructor(
    private _articleService:ArticleService
  
  ) { 
    this.url=Global.url;
  }

  ngOnInit() {
    this._articleService.getArticles().subscribe(
      Response=>{
        if(Response.articles){
          this.articles=Response.articles;
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
