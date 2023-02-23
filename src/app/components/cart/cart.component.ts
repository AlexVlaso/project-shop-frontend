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
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cart = this.cartService.cart;
  }
  onIncrementQuantity(cartItem: CartItem) {
    this.cartService.addProductToCart(cartItem);
  }
  onDecrementQuantity(cartItem: CartItem) {
    this.cartService.removeProductFromCart(cartItem);
  }
}
