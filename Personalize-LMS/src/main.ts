import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { CourseSelectionComponent } from './app/pages/course-selection.component';
import { CoursePlatformComponent } from './app/course-platform.component'; 
import { provideHttpClient } from '@angular/common/http';
import { QuizComponent } from './app/components/quiz/quiz.component';
import { AppComponent } from './app/app.component';
import { LandingPageComponent } from './app/landing-page/landing-page.component';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '/login', component: LoginComponent },
      { path: 'courses', component: CourseSelectionComponent },
      { path: 'course-platform', component: CoursePlatformComponent },
      { path: 'course-platform/:courseId', component: CoursePlatformComponent },
      { path: 'quiz/:courseId', component: QuizComponent },
      { path: '', component: LandingPageComponent },


    ])
  ]
});
