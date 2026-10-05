export interface SignupRequest {
  name: string;
  email: string;
  contact: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  contact: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: UserResponse;
}

export interface UpdateProfileRequest {
  name: string;
  contact: string;
}

export interface AddressDto {
  id?: number;
  label: string;
  streetAddress: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  default: boolean;
  createdAt?: string;
}

export interface CreateAddressRequest {
  label: string;
  streetAddress: string;
  city: string;
  state?: string;
  postalCode: string;
  country?: string;
  default?: boolean;
}

export type EnquiryType = 'SERVICE_REQUEST' | 'PRODUCT_ENQUIRY' | 'ORDER_SUPPORT' | 'GENERAL';

export interface EnquiryDto {
  id?: number;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  type: EnquiryType;
  status: string;
  createdAt?: string;
}

export interface CreateEnquiryRequest {
  subject: string;
  message: string;
  type: EnquiryType;
}

export interface UserProfileDto {
  id: number;
  name: string;
  email: string;
  contact: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  createdAt: string;
  totalOrders: number;
  totalAddresses: number;
  totalEnquiries: number;
  addresses: AddressDto[];
}
