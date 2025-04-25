import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourceSelectionService } from '../services/cource-selection.service';
import { parse } from 'marked';

@Component({
  selector: 'app-course-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css'],
})
export class CourseSelectionComponent implements OnInit {
  constructor(
    private courseSelection: CourceSelectionService,
    private router: Router
  ) {}

  courseList: any[] = [];
  user:any={};
  ngOnInit(): void {
    const storedCourseList = localStorage.getItem('courseList');
    const UserData = localStorage.getItem('UserData');
    if (storedCourseList != null || storedCourseList != undefined) {
      // If data exists in localStorage, parse and use it
      this.courseList = JSON.parse(storedCourseList);



      // const formattedCourses = this.courseList.map((course: any) => ({
      //   userId: 3,  // assuming `id` is present in UserData
      //   title: course.title,
      //   courseName: course.title,
      //   description: course.description,
      //   imageUrl: course.image,
      //   quizScore: 0
      // }));

      // this.courseSelection.submitCourses(formattedCourses).subscribe({
      //   next: (response) => {
      //     console.log('Courses submitted successfully', response);
      //   },
      //   error: (error) => {
      //     console.error('Error submitting courses', error);
      //   }
      // });


    } 
    else {
      if(UserData !=null || UserData != undefined){
        this.user=JSON.parse(UserData);  
      }
      
      // If no data in localStorage, make the API call
      const prompt = `Return a list of courses related to "${this.user.areaOfIntrest}" strictly in the exact following JSON format. Do not include any extra text, explanations, or variations. Any deviation from this format will cause the application to break. Ensure each "image" value is a valid image URL.

      [
        {
          "id": number,
          "title": "string",
          "description": "string",
          "image": "valid_image_url"
        }
      ]`;
      
  
      this.courseSelection.selectCource(prompt).subscribe({
        next: (res) => {
          this.courseList = res.courseList;
          localStorage.setItem('courseList', JSON.stringify(this.courseList));
        },
        error: (err) => {
          console.error('Error fetching course data:', err);
        }
      });
    }
    
  }

  goToCoursePlatform(courseId: number) {
    this.router.navigate(['/course-platform', courseId]);
  }
}
