import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { isAuthenticator } from '@okta/okta-auth-js';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartTotal = 0;
  selectedTotal = 0;
  isAuthenticated = false;
  userName: string = '';
  userEmail: string = '';
  storage: Storage = sessionStorage;
  constructor(
    private cartService: CartService,
    private authService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}
  ngOnInit(): void {
    this.cartService.cartTotalQuantity.subscribe(
      (data) => (this.cartTotal = data)
    );
    this.cartService.selectedTotalQuantity.subscribe(
      (data) => (this.selectedTotal = data)
    );
    this.authService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.saveUserDetails();
    });
  }
  saveUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((res) => {
        this.userName = res.name as string;
        this.storage.setItem('userName', this.userName);
      });
      this.oktaAuth.getUser().then((res) => {
        this.userEmail = res.email as string;
        this.storage.setItem('userEmail', this.userEmail);
      });
    }
  }
  logout() {
    this.oktaAuth.signOut();
    this.storage.clear();
  }
}
