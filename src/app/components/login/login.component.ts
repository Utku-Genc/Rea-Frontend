import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email?: string;
  password?: string;
  login() {
    // Kayıt işlemi burada gerçekleştirilebilir
    console.log('Kayıt işlemi gerçekleştirildi.');
  }
}
