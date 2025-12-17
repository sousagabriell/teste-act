import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LANG, AppLang } from '../../language/language.token';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  readonly labels: any;

  constructor(@Inject(LANG) lang: AppLang) {
    this.labels = (lang && (lang as any).labels) || {};
  }
}
