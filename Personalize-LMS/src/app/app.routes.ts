import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { CourseSelectionComponent } from './pages/course-selection.component';
import { CoursePlatformComponent } from './course-platform.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CourseSelectionComponent },
  { path: 'platform', component: CoursePlatformComponent },
  { path: '**', redirectTo: '' }
];
