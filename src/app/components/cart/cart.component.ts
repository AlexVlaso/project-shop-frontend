import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
  onIncrementQuantity(cartItem: CartItem) {
    this.cartService.addProductToCart(cartItem);
  }
  onDecrementQuantity(cartItem: CartItem) {
    this.cartService.removeProductFromCart(cartItem);
  }
}
