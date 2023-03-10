import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product = new Product();
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.spinner.show();
    const id = this.router.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.spinner.hide();
    });
  }
  addProductToCart() {
    const cartItem = new CartItem(this.product);
    this.cartService.addProductToCart(cartItem);
  }
  addProductToSelected() {
    const cartItem = new CartItem(this.product);
    this.cartService.addProductToSelected(cartItem);
    console.log(this.cartService.selectedList);
  }
}
