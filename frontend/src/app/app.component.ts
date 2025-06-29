import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ExperienceComponent } from './experience/experience.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from './dark-mode.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, ExperienceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected title = 'MacArdghail';

  translate: TranslateService = inject(TranslateService);
  currentLanguage: string = 'en';
  darkModeEnabled = false;

  constructor(
    private darkMode: DarkModeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.darkModeEnabled = this.darkMode.isDarkMode;

    const isBrowser =
      typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    const savedLang = isBrowser
      ? localStorage.getItem('userLanguage') || 'en'
      : 'en';

    this.currentLanguage = savedLang;
    this.translate.use(savedLang).subscribe(() => {
      this.cd.detectChanges();
    });
  }

  translateText(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang).subscribe(() => {
      this.cd.detectChanges();
    });

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('userLanguage', lang);
    }
  }

  toggleDarkMode(): void {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.darkMode.setDarkMode(this.darkModeEnabled);
  }
}
