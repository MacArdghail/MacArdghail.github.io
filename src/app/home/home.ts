import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { projects, Project } from '../data/projects';
import { posts, Post } from '../data/posts';
import { pianoPerformances, PianoPerformance } from '../data/piano';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @ViewChild('imageSection') imageSection?: ElementRef<HTMLDivElement>;
  
  projects = projects;
  posts = posts;
  pianoPerformances = pianoPerformances;

  selectedProject = signal<Project | null>(null);
  selectedPost = signal<Post | null>(null);
  selectedPiano = signal<PianoPerformance | null>(null);
  pianoVideoPlaying = signal(false);
  isLocked = signal(false);
  
  private youtubeUrlCache = new Map<string, SafeResourceUrl>();

  constructor(private sanitizer: DomSanitizer) {}

  selectProject(p: Project) {
    this.selectedPost.set(null);
    this.selectedPiano.set(null);
    this.selectedProject.set(p);
    this.isLocked.set(true);
    this.scrollToContent();
  }

  hoverProject(p: Project) {
    if (this.isLocked()) return;
    this.selectedPost.set(null);
    this.selectedPiano.set(null);
    this.selectedProject.set(p);
  }

  clearHover() {
    if (this.isLocked()) return;
    this.selectedProject.set(null);
    this.selectedPost.set(null);
    this.selectedPiano.set(null);
    this.pianoVideoPlaying.set(false);
  }

  selectPost(p: Post) {
    this.selectedProject.set(null);
    this.selectedPiano.set(null);
    this.selectedPost.set(p);
    this.isLocked.set(true);
    this.scrollToContent();
  }

  hoverPost(p: Post) {
    if (this.isLocked()) return;
    this.selectedProject.set(null);
    this.selectedPiano.set(null);
    this.selectedPost.set(p);
  }

  selectPiano(p: PianoPerformance) {
    this.selectedProject.set(null);
    this.selectedPost.set(null);
    this.selectedPiano.set(p);
    this.pianoVideoPlaying.set(false); // Reset video state when selecting a new piano video
    this.isLocked.set(true);
    this.scrollToContent();
  }

  hoverPiano(p: PianoPerformance) {
    if (this.isLocked()) return;
    this.selectedProject.set(null);
    this.selectedPost.set(null);
    this.selectedPiano.set(p);
    this.pianoVideoPlaying.set(false);
  }
  
  playPianoVideo() {
    this.pianoVideoPlaying.set(true);
  }
  
  private scrollToContent() {
    // Only scroll on mobile/tablet
    if (window.innerWidth <= 860 && this.imageSection) {
      setTimeout(() => {
        this.imageSection?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    }
  }

  getSafeYoutubeUrl(embedId: string): SafeResourceUrl {
    // Cache the URL to prevent re-creating it on every change detection cycle
    const cacheKey = embedId;
    if (!this.youtubeUrlCache.has(cacheKey)) {
      this.youtubeUrlCache.set(
        cacheKey,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${embedId}?autoplay=1`
        )
      );
    }
    return this.youtubeUrlCache.get(cacheKey)!;
  }

  getYoutubeThumbnail(embedId: string): string {
    // Use maxresdefault for highest quality, fallback to hqdefault if needed
    return `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
