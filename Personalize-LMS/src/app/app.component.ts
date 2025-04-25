import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationStart, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { WebcamOverlayComponent } from './components/webcam-overlay/webcam-overlay.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[RouterOutlet,CommonModule,RouterLink,RouterLinkActive]
})
export class AppComponent {
  showBackButton: boolean = false;
  showNavbar:boolean=false
  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    // Listen to router changes to toggle back button visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Hide navbar and back button on landing page
        this.showNavbar = event.url !== '/';
        this.showBackButton = event.url !== '/';
      }
    });
  }

  // Function to handle back navigation
  goBack() {
    this.location.back();
  }
}
