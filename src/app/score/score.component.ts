import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  score: number | null = null;
  selectedAnswers: { [key: string]: string } = {};
  correctedAns: { [key: string]: string } = {};
  results: any[] = []; // To hold the results for display

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    console.log('Navigation object:', navigation); // Add this line for debugging
    if (navigation?.extras?.state) {
      console.log('Received state:', navigation.extras.state);
      this.score = navigation.extras.state['score'] || null;
      this.selectedAnswers = navigation.extras.state['selectedAnswers'] || {};
      this.correctedAns = navigation.extras.state['correctedAns'] || {};
    } else {
      // console.error('No navigation state found.');
    }
}

viewResults() {
  if (this.selectedAnswers && this.correctedAns) {
    this.results = Object.keys(this.selectedAnswers).map((question) => {
      return {
        question: question,
        selectedAnswer: this.selectedAnswers[question],
        correctAnswer: this.correctedAns[question],
        isCorrect: this.selectedAnswers[question] === this.correctedAns[question]
      };
    });
  } else {
    console.error('Selected answers or corrected answers are not defined.');
  }
}

}
