import { Injectable } from '@angular/core';
import { HomeApiService } from '../../infra/api/home-api-service';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {
  constructor(private readonly homeApiService: HomeApiService) {}

  getProducts() {
    return this.homeApiService.callgetProducts()
  }
  deleteProduct(id: number) {
    return this.homeApiService.callDeleteProduct(id)
  }
}
