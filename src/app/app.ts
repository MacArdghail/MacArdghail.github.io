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
  cursorX = signal(0);
  cursorY = signal(0);
  cursorTrail = signal<{x: number, y: number, id: number}[]>([]);
  private animationFrame: any;
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private trailPoints: {x: number, y: number, id: number}[] = [];
  private trailIdCounter = 0;

  ngOnInit() {
    this.animate();
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
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
