import { Injectable } from '@angular/core';
import { Constants } from '../../../constants';
import { Client } from '../../../shared/client-service/client.service';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from './contract/response/error.response';
import { FormItemRequest } from './contract/request/form/form.request';

@Injectable({
  providedIn: 'root',
})
export class FormApiService {
  readonly urlBase = `${Constants.API_PRODUCTS_ENDPOINT}`

  constructor(private readonly clientService: Client) {}

  callpostProducts(form: FormValues): Observable<{ sucess: boolean }>{
    const payload = new FormItemRequest({
    item: form.item,
    price: Number(form.price),
    description: form.description
  });
    return this.clientService.post<{ sucess: boolean }>(this.urlBase, payload).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => throwError(() => ErrorResponse.convertToModel(error))),
      map((response: { sucess: boolean }) => response)
    );
  }

  callputProducts(id: number, form: FormValues): Observable<{ sucess: boolean }>{
    const url = `${this.urlBase}/${id}`;
    const payload = new FormItemRequest({
    item: form.item,
    price: Number(form.price),
    description: form.description
  });
    return this.clientService.put<{ sucess: boolean }>(url, payload).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => throwError(() => ErrorResponse.convertToModel(error))),
      map((response: { sucess: boolean }) => response)
    );
  }
}
