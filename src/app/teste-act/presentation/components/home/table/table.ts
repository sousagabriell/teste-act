
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemTable } from '../../../../domain/model/home/products-item-table';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { HomeFacade } from '../../../../abstraction/home/home-facade';
import { AppLang, LANG } from '../../../../../shared/language/language.token';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class Table {
  dataGrid: ProductsItemTable[] = [];
  readonly labels: any;
  readonly products$: Observable<ProductsItemTable[]>;

  constructor(
    @Inject(LANG) lang: AppLang,
    private readonly homeFacade: HomeFacade) {
      this.labels = (lang && (lang as any).labels) || {}
      this.products$ = this.homeFacade.getProducts().pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    }

  get getData(): Observable<ProductsItemTable[]> {
    return this.products$;
  }
}
