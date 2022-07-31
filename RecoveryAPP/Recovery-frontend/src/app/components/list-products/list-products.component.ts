import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  
  constructor(private _productService: ProductService,
        private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this._productService.getProducts().subscribe(data => {
      console.log(data);
      this.listProducts = data;
    }, error => {
      console.log(error);
    })
  }

  removeProduct(id: any) {
    this._productService.removeProduct(id).subscribe(data => {
      this.toastr.error('The product was successfully removed' ,'Product Removed');
      this.getProducts();
    }, error => {
      console.log(error);
    })
  }

}
