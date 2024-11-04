import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { error, log } from 'console';

interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [UserService]
})
export class UserComponent implements OnInit {
  score: Number = 0;
  showQuiz: boolean = false;
  questions: any[] = [];  // Array of questions fetched from the database
  selectedAnswers: { [question: string]: string } = {};  // Object to store selected answers
  correctedAns: { [question: string]: string } = {};
  formattedMcqs: { question: string, options: string[], userAnswer: string, correctAnswer: string }[] = [];

  mcqs: any[] = [];  // Array to store fetched MCQs
  topic: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // this.getMcqs();
  }

  // Fetch MCQs using the service
  getMcqs(): void {
    this.userService.fetchMcqs(this.topic).subscribe({
      next: (data) => {
        this.mcqs = data;  // Store fetched MCQs in component property
        console.log('Fetched MCQs:', this.mcqs);
        if (data) {
          // Store the MCQs in the variable
          this.mcqs.forEach((mcq: any) => {
            // Assuming mcq has a questions property which is an array
            mcq.questions.forEach((question: any) => {
              this.correctedAns[question.question] = question.correctAnswer;  // Use the question's text to set the correct answer
          
              this.formattedMcqs.push({
                question: question.question,        // Access the question text
                options: question.options,          // Access the options
                userAnswer: '',                     // Initialize with an empty string
                correctAnswer: question.correctAnswer // Access the correct answer
              });
            });
          });
          

          // console.log('Generated MCQs:', this.mcqs);
          // console.log("selected ans ", this.selectedAnswers);
          // console.log("Corrected Ans", this.correctedAns);
          console.log(this.formattedMcqs);
          
        } else {
          console.error('mcqs not found in response');
        }
      },
      error: (err) => {
        console.error('Error fetching MCQs:', err);
      }
    });
  }


  displayMcqs(): void {
    this.mcqs.forEach((mcq) => {
      console.log('Question:', mcq.questions);
      console.log('Options:', mcq.questions.options);
      console.log('Correct Answer:', mcq.questions.correctAnswer);
    });
  }



  submitAnswers() {
    console.log('submitAnswers called');
    const selectedAnswers = this.formattedMcqs.map(mcq => mcq.userAnswer);
    console.log('User answers:', selectedAnswers);
    this.score = this.calculateScore(this.selectedAnswers, this.correctedAns);
    console.log(`Your score is ${this.score}`);

    console.log("Selected Answers: ", this.selectedAnswers);
    console.log("Corrected Answers: ", this.correctedAns);

    this.router.navigate(['/score'], {
      state: {
        score: this.score,
        selectedAnswers: this.selectedAnswers,
        correctedAns: this.correctedAns
      }
    });
  }

  isAllQuestionsAnswered(): boolean {
    return this.mcqs.every(mcq => this.selectedAnswers[mcq.question]);
  }

  onAnswerSelect(mcqIndex: number, option: string) {
    if (this.formattedMcqs[mcqIndex]) {  // Ensure the index is valid
      const question = this.formattedMcqs[mcqIndex].question; // Get the question text
      this.selectedAnswers[question] = option; // Store selected answer
      this.formattedMcqs[mcqIndex].userAnswer = option; // Store in formattedMcqs as well
      console.log('Selected Answers:', this.selectedAnswers);
    } else {
      console.error(`Invalid mcqIndex: ${mcqIndex}`);
    }
  }


  calculateScore(selectedAnswers: { [key: string]: string }, correctedAns: { [key: string]: string }): number {
    let score = 0;
    for (let question in selectedAnswers) {
      if (selectedAnswers[question] === correctedAns[question]) {
        score += 2; // Increment score by 2 for each correct answer
      }
    }
    return score;
  }
}
