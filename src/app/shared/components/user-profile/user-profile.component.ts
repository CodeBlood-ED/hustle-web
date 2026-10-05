import { Component, DestroyRef, ElementRef, HostListener, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderApiService } from '../../../core/services/order-api.service';
import { OrderDto } from '../../../core/models/order.model';
import { AddressDto, CreateAddressRequest, CreateEnquiryRequest, EnquiryDto, EnquiryType } from '../../../core/models/auth.model';

export type ProfileTab = 'info' | 'orders' | 'addresses' | 'enquiries';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly orderApi = inject(OrderApiService);
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef<HTMLElement>);

  @Input() mode: 'dropdown' | 'page' = 'dropdown';

  isOpen = signal<boolean>(false);
  activeTab = signal<ProfileTab>('info');

  // Orders
  orders = signal<OrderDto[]>([]);
  isLoadingOrders = signal<boolean>(false);

  // Addresses
  addresses = signal<AddressDto[]>([]);
  showAddAddress = signal<boolean>(false);
  isSavingAddress = signal<boolean>(false);

  // Enquiries
  enquiries = signal<EnquiryDto[]>([]);
  showAddEnquiry = signal<boolean>(false);
  isSubmittingEnquiry = signal<boolean>(false);

  // Profile Edit
  isEditingProfile = signal<boolean>(false);
  isSavingProfile = signal<boolean>(false);
  profileMessage = signal<string>('');

  // Forms
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    contact: new FormControl('', [Validators.required, Validators.minLength(7)])
  });

  addressForm = new FormGroup({
    label: new FormControl('Home', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl('India'),
    isDefault: new FormControl(false)
  });

  enquiryForm = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    type: new FormControl<EnquiryType>('SERVICE_REQUEST', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  ngOnInit(): void {
    if (this.mode === 'page') {
      this.isOpen.set(true);
    }

    const current = this.authService.userProfile() || this.authService.currentUser();
    if (current) {
      this.profileForm.patchValue({
        name: current.name,
        contact: current.contact
      });
    }

    this.loadUserData();
  }

  loadUserData(): void {
    if (!this.authService.isLoggedIn()) return;

    // Load addresses
    this.authService.getAddresses().subscribe({
      next: (res) => {
        if (res.data) this.addresses.set(res.data);
      },
      error: () => {}
    });

    // Load orders
    this.isLoadingOrders.set(true);
    this.orderApi.getMyOrders().subscribe({
      next: (orders) => {
        this.isLoadingOrders.set(false);
        this.orders.set(orders);
      },
      error: () => {
        this.isLoadingOrders.set(false);
      }
    });

    // Load enquiries
    this.authService.getEnquiries().subscribe({
      next: (res) => {
        if (res.data) this.enquiries.set(res.data);
      },
      error: () => {}
    });
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.loadUserData();
    }
  }

  closeDropdown(): void {
    if (this.mode === 'dropdown') {
      this.isOpen.set(false);
    }
  }

  selectTab(tab: ProfileTab): void {
    this.activeTab.set(tab);
    if (tab === 'orders') {
      this.isLoadingOrders.set(true);
      this.orderApi.getMyOrders().subscribe({
        next: (orders) => {
          this.isLoadingOrders.set(false);
          this.orders.set(orders);
        },
        error: () => this.isLoadingOrders.set(false)
      });
    }
  }

  saveProfile(): void {
    if (!this.profileForm.valid) return;
    this.isSavingProfile.set(true);
    this.profileMessage.set('');

    const { name, contact } = this.profileForm.value;
    this.authService.updateProfile({ name: name!, contact: contact! }).subscribe({
      next: () => {
        this.isSavingProfile.set(false);
        this.isEditingProfile.set(false);
        this.profileMessage.set('Profile updated successfully!');
        setTimeout(() => this.profileMessage.set(''), 3000);
      },
      error: (err) => {
        this.isSavingProfile.set(false);
        this.profileMessage.set(err.error?.message || 'Failed to update profile');
      }
    });
  }

  saveAddress(): void {
    if (!this.addressForm.valid) return;
    this.isSavingAddress.set(true);

    const val = this.addressForm.value;
    const req: CreateAddressRequest = {
      label: val.label || 'Home',
      streetAddress: val.streetAddress!,
      city: val.city!,
      state: val.state || '',
      postalCode: val.postalCode!,
      country: val.country || 'India',
      default: val.isDefault || false
    };

    this.authService.addAddress(req).subscribe({
      next: (res) => {
        this.isSavingAddress.set(false);
        this.showAddAddress.set(false);
        this.addressForm.reset({ label: 'Home', country: 'India', isDefault: false });
        this.loadUserData();
      },
      error: () => {
        this.isSavingAddress.set(false);
      }
    });
  }

  deleteAddress(id?: number): void {
    if (!id) return;
    this.authService.deleteAddress(id).subscribe({
      next: () => {
        this.addresses.update((items) => items.filter((a) => a.id !== id));
      }
    });
  }

  submitEnquiry(): void {
    if (!this.enquiryForm.valid) return;
    this.isSubmittingEnquiry.set(true);

    const val = this.enquiryForm.value;
    const req: CreateEnquiryRequest = {
      subject: val.subject!,
      type: val.type || 'SERVICE_REQUEST',
      message: val.message!
    };

    this.authService.createEnquiry(req).subscribe({
      next: (res) => {
        this.isSubmittingEnquiry.set(false);
        this.showAddEnquiry.set(false);
        this.enquiryForm.reset({ type: 'SERVICE_REQUEST' });
        this.loadUserData();
      },
      error: () => {
        this.isSubmittingEnquiry.set(false);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.closeDropdown();
    void this.router.navigate(['/landing']);
  }

  getInitials(): string {
    const name = this.authService.currentUser()?.name || 'User';
    return name.charAt(0).toUpperCase();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.mode !== 'dropdown' || !this.isOpen()) return;
    const target = event.target as HTMLElement | null;
    if (target && !this.el.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mode === 'dropdown' && this.isOpen()) {
      this.closeDropdown();
    }
  }
}
