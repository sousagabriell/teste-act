import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type RequestOptions = {
  headers?: Record<string, string> | HttpHeaders;
  params?: Record<string, string> | HttpParams;
  responseType?: 'json' | 'text' | 'blob';
};

@Injectable({
  providedIn: 'root',
})
export class Client {
  private defaultHeaders$ = new BehaviorSubject<Record<string, string>>({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  headersChanges(): Observable<Record<string, string>> {
    return this.defaultHeaders$.asObservable();
  }

  setHeader(key: string, value: string | null): void {
    const current = { ...this.defaultHeaders$.value };
    if (value === null) {
      delete current[key];
    } else {
      current[key] = value;
    }
    this.defaultHeaders$.next(current);
  }

  getDefaultHeaders(): HttpHeaders {
    const current = this.defaultHeaders$.value || {};
    return new HttpHeaders(current as Record<string, string>);
  }

  private buildHeaders(headers?: Record<string, string> | HttpHeaders): HttpHeaders {
    let result = this.getDefaultHeaders();
    if (headers instanceof HttpHeaders) {
      headers.keys().forEach((k) => {
        const v = headers.getAll(k) || [];
        result = result.set(k, v.join(','));
      });
    } else if (headers) {
      Object.keys(headers).forEach((k) => {
        const v = headers[k];
        if (v != null) result = result.set(k, String(v));
      });
    }
    return result;
  }

  private handleResponse<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(
      map((r) => r),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
  
  request<T>(method: string, url: string, body?: any, options?: RequestOptions): Observable<T> {
    const headers = this.buildHeaders(options?.headers as any);
    const params = options?.params instanceof HttpParams ? options.params : new HttpParams({ fromObject: options?.params as any });
    const responseType = (options?.responseType || 'json') as 'json' | 'text' | 'blob';

    const obs = this.http.request<T>(method, url, {
      body,
      headers,
      params,
      responseType: responseType === 'json' ? 'json' : (responseType as any),
    });

    return this.handleResponse(obs);
  }

  get<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  post<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
    return this.request<T>('POST', url, body, options);
  }

  put<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
    return this.request<T>('PUT', url, body, options);
  }

  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }
}
