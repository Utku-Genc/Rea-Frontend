import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  constructor(private authService: AuthService

  ) {
    
  }
  logout(){
    this.authService.logOut()
    window.location.href = "/";
  }
}
