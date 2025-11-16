import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface CreateTransactionRequest {
  donorName: string;
  email: string;
  amount: number;
  anonymous: boolean;
}

interface TransactionResponse {
  id: number;
  donorName: string;
  email: string;
  amount: number;
  anonymous: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  imports: [FormsModule, ReactiveFormsModule, NgForOf, NgIf],
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiBase = environment.apiBase;

  presetAmounts = [25, 50, 100, 250];
  selectedAmount = 0;
  customAmount: number | null = null;
  isRecurring = false;
  isProcessing = false;
  donorForm: FormGroup;
  
  // Authentication state
  isLoggedIn = false;
  userEmail = '';
  userName = '';
  
  // Guest mode
  isGuestMode = false;
  showAuthOptions = true;

  constructor(private fb: FormBuilder) {
    this.donorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      anonymous: [false],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectAmount(100);
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    // Check if user is logged in (using localStorage like navbar)
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    if (token && userEmail) {
      this.isLoggedIn = true;
      this.userEmail = userEmail;
      this.userName = userName || '';
      this.showAuthOptions = false;
      this.prefillUserInfo();
    }
  }

  prefillUserInfo(): void {
    // Pre-fill form with user information
    if (this.userName) {
      const nameParts = this.userName.split(' ');
      this.donorForm.patchValue({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: this.userEmail,
      });
    } else {
      this.donorForm.patchValue({
        email: this.userEmail,
      });
    }
  }

  continueAsGuest(): void {
    this.isGuestMode = true;
    this.showAuthOptions = false;
  }

  goToLogin(): void {
    // Store current donation amount in session storage
    sessionStorage.setItem('pendingDonationAmount', this.selectedAmount.toString());
    sessionStorage.setItem('pendingDonationRecurring', this.isRecurring.toString());
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/donate' } });
  }

  goToSignup(): void {
    // Store current donation amount in session storage
    sessionStorage.setItem('pendingDonationAmount', this.selectedAmount.toString());
    sessionStorage.setItem('pendingDonationRecurring', this.isRecurring.toString());
    this.router.navigate(['/signup'], { queryParams: { returnUrl: '/donate' } });
  }

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  onCustomAmountChange(): void {
    if (this.customAmount && this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
    }
  }

  toggleRecurring(): void {
    this.isRecurring = !this.isRecurring;
  }

  getImpactText(amount: number): string {
    if (amount >= 250) return '5 shelter nights';
    if (amount >= 100) return '3 shelter nights';
    if (amount >= 50) return '1 shelter night';
    return '1 therapy session';
  }

  getDetailedImpact(): string {
    const amount = this.selectedAmount;
    const impacts = [];

    const shelterNights = Math.floor(amount / 35);
    if (shelterNights > 0) {
      impacts.push(
        `provide ${shelterNights} emergency shelter night${
          shelterNights > 1 ? 's' : ''
        }`
      );
    }

    const therapySessions = Math.floor(amount / 25);
    if (therapySessions > 0 && impacts.length === 0) {
      impacts.push(
        `provide ${therapySessions} therapy session${
          therapySessions > 1 ? 's' : ''
        } for children`
      );
    }

    if (amount >= 50) {
      impacts.push('support prevention workshops');
    }

    return impacts.join(', ') || 'support families in need';
  }

  async submitDonation(): Promise<void> {
    if (!this.donorForm.valid || this.selectedAmount === 0) {
      return;
    }

    this.isProcessing = true;

    const formValue = this.donorForm.value;
    const donorName = `${formValue.firstName} ${formValue.lastName}`;
    
    // Create transaction request with actual form data
    const transactionRequest: CreateTransactionRequest = {
      donorName: formValue.anonymous ? 'Anonymous' : donorName,
      email: formValue.email,
      amount: this.selectedAmount,
      anonymous: formValue.anonymous || false,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': environment.apiKey,
    });

    // API call to create transaction
    this.http
      .post<TransactionResponse>(
        `${this.apiBase}/transactions`,
        transactionRequest,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Transaction created:', response);
          this.isProcessing = false;
          
          const message = `Thank you ${formValue.anonymous ? '' : formValue.firstName} for your ${
            this.isRecurring ? 'monthly ' : ''
          }donation of $${this.selectedAmount}!\n\nTransaction ID: ${response.id}\n\nYou will receive a confirmation email at ${formValue.email}`;
          
          alert(message);

          // Reset form
          this.donorForm.reset();
          this.selectedAmount = 100;
          this.isRecurring = false;
          
          // If user was logged in, keep their info filled
          if (this.isLoggedIn) {
            this.prefillUserInfo();
          }
        },
        error: (err) => {
          console.error('Error creating transaction:', err);
          this.isProcessing = false;
          alert(
            'An error occurred while processing your donation. Please try again.'
          );
        },
      });
  }
}
