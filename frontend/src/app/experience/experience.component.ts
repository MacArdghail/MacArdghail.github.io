import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ButtonModule, CommonModule, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  @Input() darkMode: boolean = false;
}
