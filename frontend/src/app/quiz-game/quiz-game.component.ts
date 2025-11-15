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
  answerSubmitted: boolean = false;
  showFeedback: boolean = false;

  ngOnInit(): void {
    this.initializeQuiz();
  }

  initializeQuiz(): void {
    this.userAnswers = new Array(this.questions.length).fill(null);
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.showResult = false;
    this.answerSubmitted = false;
    this.showFeedback = false;
    this.initializeQuiz();
  }

  selectAnswer(optionIndex: number): void {
    if (!this.answerSubmitted) {
      this.selectedAnswer = optionIndex;
    }
  }

  submitAnswer(): void {
    if (this.selectedAnswer !== null && !this.answerSubmitted) {
      this.answerSubmitted = true;
      this.showFeedback = true;
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;

      if (this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
        this.score++;
      }
    }
  }

  nextQuestion(): void {
    if (this.answerSubmitted) {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = this.userAnswers[this.currentQuestionIndex];
        this.answerSubmitted = this.userAnswers[this.currentQuestionIndex] !== null;
        this.showFeedback = this.answerSubmitted;
      } else {
        this.showResult = true;
      }
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex];
      this.answerSubmitted = this.userAnswers[this.currentQuestionIndex] !== null;
      this.showFeedback = this.answerSubmitted;
    }
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
    if (percentage === 100) return 'Perfect!';
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Well done!';
    if (percentage >= 40) return 'Not Bad!';
    return '';
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  isCorrectAnswer(optionIndex: number): boolean {
    return optionIndex === this.questions[this.currentQuestionIndex].correctAnswer;
  }

  isWrongAnswer(optionIndex: number): boolean {
    return this.answerSubmitted &&
           this.selectedAnswer === optionIndex &&
           optionIndex !== this.questions[this.currentQuestionIndex].correctAnswer;
  }

  shouldShowCorrect(optionIndex: number): boolean {
    return this.answerSubmitted && this.isCorrectAnswer(optionIndex);
  }
}
