import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  theyLiveMode = signal(false);
  theyLiveMessage = signal('HIRE ME');
  isGlitching = signal(false);

  cursorX = signal(0);
  cursorY = signal(0);
  cursorTrail = signal<{x: number, y: number, id: number}[]>([]);
  private messageInterval: any;
  private animationFrame: any;
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private trailPoints: {x: number, y: number, id: number}[] = [];
  private trailIdCounter = 0;

  currentTime = signal('');
  currentTimeMobile = signal('');
  private timeInterval: any;

  
  private messages = [
    'HIRE ME',
    'LINKEDIN',
    'GITHUB',
  ];
  private currentIndex = 0;

  ngOnInit() {
    this.animate();
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
  }

  private updateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    // Format: DD/MM/YYYY, HH:MM:SS
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const parts = formatter.formatToParts(now);
    
    const day = parts.find(p => p.type === 'day')?.value || '';
    const month = parts.find(p => p.type === 'month')?.value || '';
    const year = parts.find(p => p.type === 'year')?.value || '';
    const hour = parts.find(p => p.type === 'hour')?.value || '';
    const minute = parts.find(p => p.type === 'minute')?.value || '';
    const second = parts.find(p => p.type === 'second')?.value || '';
    
    this.currentTime.set(`${day}/${month}/${year}, ${hour}:${minute}:${second}`);
    this.currentTimeMobile.set(`${day}/${month}/${year.slice(-2)}, ${hour}:${minute}`);
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  private animate = () => {
    // Dot follows mouse immediately
    this.cursorX.set(this.mouseX);
    this.cursorY.set(this.mouseY);
    
    // Trail follows with easing for smooth effect
    const dx = this.mouseX - this.currentX;
    const dy = this.mouseY - this.currentY;
    
    this.currentX += dx * 0.15;
    this.currentY += dy * 0.15;
    
    // Add trail point
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      this.trailPoints.push({
        x: this.currentX,
        y: this.currentY,
        id: this.trailIdCounter++
      });
      
      // Keep only last 15 points
      if (this.trailPoints.length > 15) {
        this.trailPoints.shift();
      }
      
      this.cursorTrail.set([...this.trailPoints]);
    }
    
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  toggleTheyLive() {
    this.theyLiveMode.update((v) => !v);
    
    if (this.theyLiveMode()) {
      // Start rotating messages with glitch transitions
      this.currentIndex = 0;
      this.theyLiveMessage.set(this.messages[0]);
      this.messageInterval = setInterval(() => {
        // Trigger glitch effect
        this.isGlitching.set(true);
        
        // Change message during glitch
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.messages.length;
          this.theyLiveMessage.set(this.messages[this.currentIndex]);
        }, 200);
        
        // End glitch effect
        setTimeout(() => {
          this.isGlitching.set(false);
        }, 400);
      }, 5000);
    } else {
      // Stop rotating messages
      if (this.messageInterval) {
        clearInterval(this.messageInterval);
      }
      this.isGlitching.set(false);
    }
  }

  getTrailPath(): string {
    const trail = this.cursorTrail();
    if (trail.length < 1) return '';

    // Start from the oldest trail point and connect to the current cursor position
    let path = 'M ' + trail.map(p => `${p.x},${p.y}`).join(' L ');

    // Always end at the current cursor dot position
    path += ` L ${this.cursorX()},${this.cursorY()}`;
    
    return path;
  }

  ngOnDestroy() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
