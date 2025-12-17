import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppLang, LANG } from '../../language/language.token';
import { FormFacade } from '../../../teste-act/abstraction/form/form-facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-add.html',
  styleUrls: ['./form-add.scss'],
})
export class FormAdd {
  readonly labels: any;
  public form: FormGroup;

  constructor(
    @Inject(LANG) lang: AppLang,
    private readonly formBuilder: FormBuilder,
    private readonly formFacade: FormFacade,
    private readonly router: Router
  ) {
    this.labels = (lang && (lang as any).labels) || {};
    this.form = this.formBuilder.group({
      item: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required]],
    });
  }

  public saveProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: FormValues = this.form.value;
    this.formFacade.addProducts(payload).subscribe({
      next: (response) => {
        this.form.reset();
        this.router.navigate(['/home']);
      },
    });
  }
}
