import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourceSelectionService } from './services/cource-selection.service';
import { marked, Marked } from 'marked'; 
import { RouterOutlet,Router,RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-platform',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './course-platform.component.html',
  styleUrls: ['./course-platform.component.css'],
})
export class CoursePlatformComponent {
  topic: any = {}; // Holds the course content
  userMessage: string = '';
  chatMessages: any[] = [];
  isVoiceMode: boolean = false;
  isListening: boolean = false;
  syllabus:string| Promise<string>="";
  constructor(private route: ActivatedRoute, private ser: CourceSelectionService,private router: Router) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.loadCourseDetails(courseId); 
  }

  loadCourseDetails(courseId: number) {
    const courses: any[] = JSON.parse(localStorage.getItem('courseList') || '[]');
    this.topic = courses.find(course => course.id === courseId) || {};
    const topicData = localStorage.getItem(this.topic.title);

      // const userData = localStorage.getItem('UserData');
      // const user = userData ? JSON.parse(userData) : null;
    if(topicData !=null ){
      this.syllabus = marked(JSON.parse(topicData));
    }
    else{
      this.GetSyllabusByCourse(this.topic.title + this.topic.description);
    }
    

  }

  GetSyllabusByCourse(CourseName:string){

     this.ser.GetMoreInfoRelatedToTopic(CourseName).subscribe({
      next:(res)=>{
      localStorage.setItem(this.topic.title, JSON.stringify(res.syllabus));
      this.syllabus = marked(res.syllabus)

      },
      error:(err)=>{

      }
     })
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatMessages.push({ sender: 'You', text: this.userMessage });
    //  this.userMessage = '';
      this.getAssistantResponse();
    }
  }

  toggleVoiceInput() {
    this.isVoiceMode = !this.isVoiceMode;
    this.isListening = false;
    if (this.isVoiceMode) {
      this.startVoiceRecognition();
    }
  }

  startVoiceRecognition() {
    const recognition = new (window as any).SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      this.isListening = true;
    };

    recognition.onresult = (event: any) => {
      const message = event.results[0][0].transcript;
      this.userMessage = message;
      this.sendMessage();
      this.isListening = false;
    };

    recognition.onerror = () => {
      this.isListening = false;
    };

    recognition.onend = () => {
      this.isListening = false;
    };

    recognition.start();
  }

  getAssistantResponse() {
    this.ser.GetMoreInfoRelatedToTopic(this.userMessage).subscribe({
      next:(res)=>{
        this.chatMessages.push({ sender: 'Assistant', text: marked(res.syllabus) });
          this.userMessage = '';
      },
      error:(err)=>{

      }
     })
  }
  navigateToQuizPage() {
    this.router.navigate(['/quiz',this.topic.id]); // Or use your actual route and parameters
  }
}
