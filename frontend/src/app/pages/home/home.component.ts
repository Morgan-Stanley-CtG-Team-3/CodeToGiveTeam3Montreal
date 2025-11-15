import { Component } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';
import { Router } from '@angular/router';
import { QuizGameComponent } from '../../quiz-game/quiz-game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent, QuizGameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  onDonateClick() {
    // Navigate to donation page or open donation form
    console.log('Donate button clicked!');
    // For now, just scroll to donation section or implement your logic
  }
}
