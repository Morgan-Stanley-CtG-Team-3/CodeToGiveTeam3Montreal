// File: frontend/src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { N8nFormComponent } from '../n8n-form/n8n-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, N8nFormComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false; // État de connexion
  isLoginModalOpen = false;
  isSignupModalOpen = false;
  isAuthChoiceModalOpen = false;
  redirectToDonateAfterAuth = false; // Flag pour rediriger vers donate après auth

  // Login form data
  loginEmail = '';
  loginPassword = '';

  // Signup form data
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';
  signupPhone = '';
  signupAddress = '';
  signupCity = '';
  signupPostalCode = '';
  signupCountry = '';

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToDonate(): void {
    this.closeMenu();
    if (this.isLoggedIn) {
      this.router.navigate(['/donate']);
    } else {
      this.openAuthChoiceModal();
    }
  }

  // Auth choice modal methods
  openAuthChoiceModal(): void {
    this.isAuthChoiceModalOpen = true;
  }

  closeAuthChoiceModal(): void {
    this.isAuthChoiceModalOpen = false;
  }

  continueAsGuest(): void {
    this.closeAuthChoiceModal();
    this.router.navigate(['/donate']);
  }

  openLoginFromAuthChoice(): void {
    this.closeAuthChoiceModal();
    this.redirectToDonateAfterAuth = true;
    this.openLoginModal();
  }

  openSignupFromAuthChoice(): void {
    this.closeAuthChoiceModal();
    this.redirectToDonateAfterAuth = true;
    this.openSignupModal();
  }

  // Login modal methods
  openLoginModal(): void {
    this.isLoginModalOpen = true;
    this.closeMenu();
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
    this.resetLoginForm();
  }

  resetLoginForm(): void {
    this.loginEmail = '';
    this.loginPassword = '';
  }

  handleLogin(): void {
    console.log('Login attempt:', { email: this.loginEmail, password: this.loginPassword });
    // Simuler la connexion réussie
    this.isLoggedIn = true;
    this.closeLoginModal();

    // Rediriger vers donate si on vient du modal de choix
    if (this.redirectToDonateAfterAuth) {
      this.redirectToDonateAfterAuth = false;
      this.router.navigate(['/donate']);
    }
  }

  // Signup modal methods
  openSignupModal(): void {
    this.isSignupModalOpen = true;
    this.closeMenu();
  }

  closeSignupModal(): void {
    this.isSignupModalOpen = false;
    this.resetSignupForm();
  }

  resetSignupForm(): void {
    this.signupName = '';
    this.signupEmail = '';
    this.signupPassword = '';
    this.signupConfirmPassword = '';
    this.signupPhone = '';
    this.signupAddress = '';
    this.signupCity = '';
    this.signupPostalCode = '';
    this.signupCountry = '';
  }

  handleSignup(): void {
    console.log('Signup attempt:', {
      name: this.signupName,
      email: this.signupEmail,
      password: this.signupPassword,
      phone: this.signupPhone,
      address: this.signupAddress,
      city: this.signupCity,
      postalCode: this.signupPostalCode,
      country: this.signupCountry
    });
    // Simuler l'inscription réussie
    this.isLoggedIn = true;
    this.closeSignupModal();

    // Rediriger vers donate si on vient du modal de choix
    if (this.redirectToDonateAfterAuth) {
      this.redirectToDonateAfterAuth = false;
      this.router.navigate(['/donate']);
    }
  }

  // Switch between modals
  switchToSignup(): void {
    this.closeLoginModal();
    this.openSignupModal();
  }

  switchToLogin(): void {
    this.closeSignupModal();
    this.openLoginModal();
  }

  // Logout method
  handleLogout(): void {
    console.log('User logged out');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
