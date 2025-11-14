import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-quiz-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent implements OnInit {
  questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Quelle est la capitale de la France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 2
    },
    {
      id: 2,
      question: 'Combien de continents y a-t-il sur Terre?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'Quel est le plus grand océan du monde?',
      options: ['Océan Atlantique', 'Océan Pacifique', 'Océan Indien', 'Océan Arctique'],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'En quelle année a eu lieu la Révolution française?',
      options: ['1789', '1776', '1804', '1815'],
      correctAnswer: 0
    },
    {
      id: 5,
      question: 'Quelle planète est connue comme la planète rouge?',
      options: ['Vénus', 'Jupiter', 'Mars', 'Saturne'],
      correctAnswer: 2
    }
  ];

  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  score: number = 0;
  showResult: boolean = false;
  userAnswers: (number | null)[] = [];
  quizStarted: boolean = false;

  ngOnInit(): void {
    this.initializeQuiz();
  }

  initializeQuiz(): void {
    this.userAnswers = new Array(this.questions.length).fill(null);
  }

  startQuiz(): void {
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.showResult = false;
    this.initializeQuiz();
  }

  selectAnswer(optionIndex: number): void {
    if (!this.showResult) {
      this.selectedAnswer = optionIndex;
    }
  }

  nextQuestion(): void {
    if (this.selectedAnswer !== null) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;

      if (this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
        this.score++;
      }

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = this.userAnswers[this.currentQuestionIndex];
      } else {
        this.showResult = true;
      }
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;
      this.currentQuestionIndex--;
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex];
    }
  }

  restartQuiz(): void {
    this.startQuiz();
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get scorePercentage(): number {
    return (this.score / this.questions.length) * 100;
  }

  get scoreMessage(): string {
    const percentage = this.scorePercentage;
    if (percentage === 100) return 'Parfait! 🎉';
    if (percentage >= 80) return 'Excellent! 🌟';
    if (percentage >= 60) return 'Bien joué! 👍';
    if (percentage >= 40) return 'Pas mal! 😊';
    return 'Continue à apprendre! 📚';
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
