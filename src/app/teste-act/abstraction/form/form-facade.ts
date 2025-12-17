import { Injectable } from '@angular/core';
import { FormApiService } from '../../infra/api/form-api-service';

@Injectable({
  providedIn: 'root',
})
export class FormFacade {
    constructor(private readonly formApiService: FormApiService) {}
  
    addProducts(form : FormValues) {return this.formApiService.callpostProducts(form)}
    editProducts(id: number, form : FormValues) {return this.formApiService.callputProducts(id, form)}
}
