import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiUrlService } from '../api-url.service';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-ai',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './exam-ai.component.html',
  styleUrl: './exam-ai.component.css'

})
export class ExamAiComponent {
  topic: string = '';            // User input for topic
  difficulty: string = '';        // User input for difficulty
  questions: any[] = [];          // Store MCQ response
  currentQuestionIndex: number = 0; // Track current question
  userAnswers: string[] = [];     // Store user answers
  showQuiz: boolean = false;    // Default value

  constructor (private apiservice:ApiUrlService){}

  generateMCQ() {
    this.apiservice.generateMcq(this.topic, this.difficulty).subscribe({
      next: (response)=>{
        this.questions = JSON.parse(response.questions);
        this.currentQuestionIndex = 0;
        this.showQuiz = true; 
      },
      error:(error)=>{
        console.error('Error fetching MCQs:', error);

      }
    }
      /* (response) => {
        this.questions = JSON.parse(response.questions); // Parse the JSON string into an array of questions
        this.currentQuestionIndex = 0;
        this.showQuiz = true; // Show the quiz after questions are loaded
      },
      (error) => {
        console.error('Error fetching MCQs:', error);
      } */
    );
    // Call your backend API to generate MCQs based on the topic and difficulty
  }
}

