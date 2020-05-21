import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './catalogue.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public categories ;

  constructor(private catalogueService:CatalogueService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }


//public
  public getCategories() {
    this.catalogueService.getResource("/categories")
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err)
        })
  }
}