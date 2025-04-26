import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationStart, RouterOutlet, RouterModule } from '@angular/router';
// import { WebcamOverlayComponent } from './components/webcam-overlay/webcam-overlay.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[RouterOutlet,CommonModule,RouterModule]
})
export class AppComponent {
  title = 'Personalize-LMS';
  showBackButton: boolean = false;
  showNavbar: boolean = true; // Always show navbar
  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    // Listen to router changes to toggle back button visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Only control back button visibility
        this.showBackButton = event.url !== '/login' && event.url !== '/';
      }
    });
  }

  // Function to handle back navigation
  goBack() {
    this.location.back();
  }
}
