import { InjectionToken } from '@angular/core';
import lang from './pt-br';

export type AppLang = typeof lang;

export const LANG_VALUE: AppLang = lang as AppLang;

export const LANG = new InjectionToken<AppLang>('APP_LANG', {
	providedIn: 'root',
	factory: () => LANG_VALUE,
});
