import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LandingModalsService {
  readonly syllabusOpen = signal(false);
  readonly quizOpen = signal(false);

  openSyllabus(): void {
    this.quizOpen.set(false);
    this.syllabusOpen.set(true);
  }

  closeSyllabus(): void {
    this.syllabusOpen.set(false);
  }

  openQuiz(): void {
    this.syllabusOpen.set(false);
    this.quizOpen.set(true);
  }

  closeQuiz(): void {
    this.quizOpen.set(false);
  }
}
