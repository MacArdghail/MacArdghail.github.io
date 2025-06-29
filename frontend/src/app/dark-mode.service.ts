import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeKey = 'darkMode';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isDarkMode(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.darkModeKey) === 'enabled';
    }
    return false;
  }

  setDarkMode(enabled: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (enabled) {
        localStorage.setItem(this.darkModeKey, 'enabled');
        document.body.classList.add('dark-mode');
      } else {
        localStorage.setItem(this.darkModeKey, 'disabled');
        document.body.classList.remove('dark-mode');
      }
    }
  }
}
