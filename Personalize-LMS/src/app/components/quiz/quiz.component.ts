import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  RouterOutlet,Router,RouterModule, ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  imports:[CommonModule,FormsModule,RouterModule,RouterOutlet]
})
export class QuizComponent implements OnInit {
  
  constructor(private quizService: QuizService,private route:ActivatedRoute,private router: Router,) {}

  topic :any={}; // You can set this dynamically
  quizData: any[] = [];
  userAnswers: string[] = [];

currentQuestionIndex: number = 0;

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const courses: any[] = JSON.parse(localStorage.getItem('courseList') || '[]');
    this.topic = courses.find(course => course.id === courseId) || {};
    this.getQuiz(this.topic.title + this.topic.description);
  }

  getQuiz(topic: string) {
    this.quizService.getQuiz(topic).subscribe({
      next: (res) => {
        console.log(res.syllabus);
         this.quizData = JSON.parse(res.syllabus);
         this.userAnswers = new Array(this.quizData.length).fill('');
      },
      error: (err) => console.error(err),
    });
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.quizData.length - 1) {
      this.currentQuestionIndex++;
    }
  }
  
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  
  submitQuiz() {
    let score = 0;
    this.quizData.forEach((q, index) => {
      if (q.answer === this.userAnswers[index]) {
        score++;
      }
    });
    alert(`You scored ${score}/${this.quizData.length}`);
    const userData = localStorage.getItem('UserData');
    const user = userData ? JSON.parse(userData) : null;

    
      this.quizService.updateQuizScore(this.topic.title, user.id,score).subscribe({
        next: (res) => {
          console.log('Quiz score updated successfully', res);
        },
        error: (err) => {
          console.error('Failed to update quiz score', err);
        }
      });

      if(score< this.quizData.length-1){
         alert("You have Scored too less you have to learn more");
         this.router.navigate(['/course-platform/',this.topic.id])
      }
      else{
        this.router.navigate(['/course-platform/',this.topic.id+1])
      }
    
  }
 
}
