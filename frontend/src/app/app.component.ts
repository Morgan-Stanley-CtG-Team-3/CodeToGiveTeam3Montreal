import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizGameComponent } from './quiz-game/quiz-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuizGameComponent],
  template: `
    <div>
      <button *ngIf="!showQuiz" (click)="showQuiz = true">
        Commencer le Quiz
      </button>

      <app-quiz-game *ngIf="showQuiz"></app-quiz-game>
    </div>
  `
})
export class AppComponent {
  title = 'frontend';
  showQuiz = false;
}
