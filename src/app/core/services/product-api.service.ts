import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { CategorySummaryDto, ProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/products`;

  getProducts(category?: string, search?: string, tag?: string): Observable<ProductDto[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (search) params = params.set('search', search);
    if (tag) params = params.set('tag', tag);

    return this.http.get<ApiResponse<ProductDto[]>>(this.baseUrl, { params }).pipe(
      map(res => res.data ?? [])
    );
  }

  getProductById(id: number): Observable<ProductDto | null> {
    return this.http.get<ApiResponse<ProductDto>>(`${this.baseUrl}/${id}`).pipe(
      map(res => res.data ?? null)
    );
  }

  getCategories(): Observable<CategorySummaryDto[]> {
    return this.http.get<ApiResponse<CategorySummaryDto[]>>(`${this.baseUrl}/categories`).pipe(
      map(res => res.data ?? [])
    );
  }
}
