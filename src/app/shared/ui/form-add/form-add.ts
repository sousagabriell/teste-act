import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppLang, LANG } from '../../language/language.token';
import { FormFacade } from '../../../teste-act/abstraction/form/form-facade';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-add.html',
  styleUrls: ['./form-add.scss'],
})
export class FormAdd implements OnInit {
  readonly labels: any;
  public form: FormGroup;
  product?: any;
  redirectAfterSave = true;

  constructor(
    @Inject(LANG) lang: AppLang,
    private readonly formBuilder: FormBuilder,
    private readonly formFacade: FormFacade,
    private readonly router: Router,
    public bsModalRef?: BsModalRef
  ) {
    this.labels = (lang && (lang as any).labels) || {};
    this.form = this.formBuilder.group({
      item: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue({
        item: this.product.item || '',
        description: this.product.description || '',
        price: this.product.price || ''
      });
    }
  }

  public saveProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const payload: FormValues = this.form.value;
    const request$ = this.product?.id
      ? this.formFacade.editProducts(this.product.id, payload)
      : this.formFacade.addProducts(payload);

    request$.subscribe({
      next: (response) => {
        this.form.reset();
        if (this.bsModalRef) {
          this.bsModalRef.hide();
        }
        if (this.redirectAfterSave) {
          this.router.navigate(['/home']);
        }
      },
    });
  }
}
