import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  providers:[]
})
export class StudentComponent implements OnInit{
 

  constructor( private router:Router){}
  ngOnInit(): void {
  }

  startQuiz(): void {
    this.router.navigate(['/user']);
  }

}
