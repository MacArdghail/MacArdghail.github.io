import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {
  age = signal('23.000000000');
  private intervalId: any;
  private birthDate = new Date('2003-02-28T00:00:00');

  ngOnInit() {
    this.updateAge();
    // Update every 10ms for smoother animation
    this.intervalId = setInterval(() => this.updateAge(), 10);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateAge() {
    const now = new Date();
    const diffMs = now.getTime() - this.birthDate.getTime();
    const ageYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    // 8 decimal places
    this.age.set(ageYears.toFixed(9));
  }

  scrollToFootnote() {
    const footnote = document.getElementById('footnote-1');
    if (footnote) {
      footnote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
