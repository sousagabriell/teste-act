import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ProductsItemTable } from '../../domain/model/home/products-item-table';
import { Client } from '../../../shared/client-service/client.service';
import { Constants } from '../../../constants';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from './contract/response/error.response';
import { ProductsItemTableResponse } from './contract/response/home/home.response';

@Injectable({
  providedIn: 'root',
})
export class HomeApiService {
  readonly urlBase = `${Constants.API_PRODUCTS_ENDPOINT}`

  constructor(private readonly clientService: Client) {}

  callgetProducts(): Observable<ProductsItemTable[]>{
    return this.clientService.get<ProductsItemTable[]>(this.urlBase).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => throwError(() => ErrorResponse.convertToModel(error))),
      map((response: ProductsItemTable[]) => ProductsItemTableResponse.convert(response))
    );
  }

  callDeleteProduct(id: number): Observable<void> {
    const url = `${this.urlBase}/${id}`;
    return this.clientService.delete<void>(url).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => throwError(() => ErrorResponse.convertToModel(error)))
    );
  }
}
