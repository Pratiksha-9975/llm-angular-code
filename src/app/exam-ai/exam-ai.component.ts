import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiUrlService } from '../api-url.service';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
}
@Component({
  selector: 'app-exam-ai',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './exam-ai.component.html',
  styleUrl: './exam-ai.component.css'

})

export class ExamAiComponent {
  model: string = "llama3-8b-8192"; // Initialize with default value
  temperature: number = 1;
  max_tokens: number = 1024;
  top_p: number = 1;
  stream: boolean = true;
  stop: string[] | null = null;
  topic: string = '';            // User input for topic
  difficulty: string = '';        // User input for difficulty
  questions: any[] = [];          // Store MCQ response
  currentQuestionIndex: number = 0; // Track current question
 
  showQuiz: boolean = false;    // Default value
  mcqResult: MCQ[] = [];
  selectedAnswers: { [key: string]: string } = {};
  correctedAns : {[key:string]:string} = {}
  score:Number = 0
 

  formattedMcqs: { question: string, options: string[], userAnswer: string, correctAnswer: string }[] = [];


  constructor(private apiservice: ApiUrlService , private router:Router) { }
  
 

  generateQuestions() {
    
    this.apiservice.generateMcq(this.topic,this.difficulty).subscribe({
      next: (response) => {
        

      
        if (response && response.mcqResult) {
          this.mcqResult = response.mcqResult; // Store the MCQs in the variable
          this.mcqResult.forEach((mcq: any) => {
            this.correctedAns[mcq.question] = mcq.correctAnswer;
          });
          console.log('Generated MCQs:', this.mcqResult);
          console.log("selected ans ",this.selectedAnswers);
          console.log("Corrected Ans",this.correctedAns);
          // this.saveMcqsToBackend();
          
          
          
        } else {
          console.error('mcqResult not found in response');
        }
      },
      error: (error) => {
        console.error('Error generating MCQs:', error);
      },
    });
  }

  saveMcqsToBackend() {
    const mcqData = {
      topic: this.topic,
      difficulty: this.difficulty,
      questions: this.mcqResult
    };
    
    this.apiservice.saveMcq(mcqData).subscribe({
      next: (res) => console.log('MCQs saved successfully', res),
      error: (err) => console.error('Error saving MCQs', err)
    });
    this.router.navigate(['/student'])
  }






    submitAnswers() {
      console.log('submitAnswers called');
      
      const selectedAnswers = this.formattedMcqs.map(mcq => mcq.userAnswer);
      console.log('User answers:', selectedAnswers);
      
      this.score = this.calculateScore(this.selectedAnswers, this.correctedAns);
      console.log(`Your score is ${this.score}`);
      
      // Ensure selected and corrected answers are populated
      console.log("Selected Answers: ", this.selectedAnswers);
      console.log("Corrected Answers: ", this.correctedAns);
      
      // Navigate to score component with state
      this.router.navigate(['/score'], { 
          state: { 
              score: this.score,
              selectedAnswers: this.selectedAnswers,
              correctedAns: this.correctedAns 
          } 
      });
  }
  
  isAllQuestionsAnswered(): boolean {
       return this.mcqResult.every(mcq => this.selectedAnswers[mcq.question]);
    }
  onAnswerSelect(mcqIndex: number, option: string) {
    this.formattedMcqs[mcqIndex].userAnswer = option;
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