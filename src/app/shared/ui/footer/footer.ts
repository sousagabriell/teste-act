import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LANG, AppLang } from '../../language/language.token';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  readonly labels: any;

  constructor(@Inject(LANG) lang: AppLang) {
    this.labels = (lang && (lang as any).labels) || {};
  }
}
