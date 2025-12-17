
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemTable } from '../../../../domain/model/home/products-item-table';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HomeFacade } from '../../../../abstraction/home/home-facade';
import { AppLang, LANG } from '../../../../../shared/language/language.token';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormAdd } from '../../../../../shared/ui/form-add/form-add';

@Component({
  selector: 'app-table',
  imports: [CommonModule, ModalModule],
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class Table {
  dataGrid: ProductsItemTable[] = [];
  readonly labels: any;
  readonly products$: Observable<ProductsItemTable[]>;
  bsModalRef?: BsModalRef;

  constructor(
    @Inject(LANG) lang: AppLang,
    private readonly homeFacade: HomeFacade,
    private readonly modalService: BsModalService
  ) {
    this.labels = (lang && (lang as any).labels) || {}
    this.products$ = this.homeFacade.getProducts().pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  get getData(): Observable<ProductsItemTable[]> {
    return this.products$;
  }

  public deleteItem(id: number): void {
    this.homeFacade.deleteProduct(id).subscribe({
      next: () => {
        this.homeFacade.getProducts().subscribe();
      }
    });
  }
  public editItem(item: ProductsItemTable): void {
    this.bsModalRef = this.modalService.show(FormAdd, {
      initialState: {
        product: item,
        redirectAfterSave: false
      }
    });
  }
}