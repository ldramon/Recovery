import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  title = 'Create product';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productService: ProductService,
              private aRouter: ActivatedRoute) { 
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  addProduct() {

    const PRODUCT: Product = {
      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
    }

    console.log(PRODUCT);
    this._productService.saveProduct(PRODUCT).subscribe(data => {
      this.toastr.success('The product was registered successfully!', 'Registered Product!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productForm.reset();
    })

  
  }

  esEditar() {

    if(this.id !== null) {
      this.title = 'Edit product';
      this._productService.getProduct(this.id).subscribe(data => {
        this.productForm.setValue({
          product: data.name,
          category: data.categoria,
          location: data.location,
          price: data.price,
        })
      })
    }
  }

}
