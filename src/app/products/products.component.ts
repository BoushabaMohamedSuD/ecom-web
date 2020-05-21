import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;

  constructor(private catalogueService:CatalogueService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.catalogueService.getResource("/products/search/selectedProducts").subscribe(data=>{
      this.products=data;
    },err => {
      console.log(err)
    })
  }
}
