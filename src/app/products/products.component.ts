import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  public editPhoto :boolean;
  public currentProduct: any;
  public selectedFiles;
  public progress: number;
  public currentFileUpload: any;
  public currentTime: number;

  constructor(
    public catalogueService: CatalogueService,
    public route: ActivatedRoute,private router:Router)
  {}


  ngOnInit() {
    this.router.events.subscribe((val)=> {
      if (val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.getProducts('/products/search/selectedProducts');
        }
        else if (p1 == 2){
          let idCat= this.route.snapshot.params.p2;
          this.getProducts('/categories/'+idCat+'/products');
        }

      }
    });

    let p1=this.route.snapshot.params.p1;
    if(p1==1){
      this.getProducts('/products/search/selectedProducts');
    }
  }

  public getProducts(url)
    {
      this.catalogueService.getResource(url).subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err)
      })
    }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }
}

