import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tasklist-frontend';
  username : any;
  constructor(private router: Router) {
    this.username = localStorage.getItem('currentUser')
  }
  logout() {
    localStorage.clear();
    location.reload();
    
  }
}
