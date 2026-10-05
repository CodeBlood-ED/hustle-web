import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { CreateOrderRequest, OrderDto } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  createOrder(request: CreateOrderRequest): Observable<OrderDto> {
    return this.http.post<ApiResponse<OrderDto>>(this.baseUrl, request).pipe(
      map(res => res.data)
    );
  }

  trackOrder(orderNumber: string): Observable<OrderDto> {
    return this.http.get<ApiResponse<OrderDto>>(`${this.baseUrl}/track/${orderNumber}`).pipe(
      map(res => res.data)
    );
  }

  getMyOrders(): Observable<OrderDto[]> {
    return this.http.get<ApiResponse<OrderDto[]>>(`${this.baseUrl}/my-orders`).pipe(
      map(res => res.data ?? [])
    );
  }
}
