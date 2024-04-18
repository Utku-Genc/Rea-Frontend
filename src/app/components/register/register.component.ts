import { Component } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;

  register() {
    // Kayıt işlemi burada gerçekleştirilebilir
    console.log('Kayıt işlemi gerçekleştirildi.');
  }
}
