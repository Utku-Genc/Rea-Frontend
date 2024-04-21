import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/loginModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(    private formBuilder:FormBuilder,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router){

  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.email],
      password:["",Validators.required]
    })
    console.log("çalıştı");
  }



  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        console.log(response.data.token);
        this.localStorageService.remove("token");
        this.localStorageService.remove("expiration")
        this.localStorageService.setItem("token",response.data.token);
        this.localStorageService.setItem("expiration",response.data.expiration)
        window.location.href = "/";
        console.log("giriş başarılı")
      }, responseError=>{
        console.log("hata")
      });
    } else {
      console.log("Lütfen Tüm Alanları Doldurun: "+this.loginForm.value)
    }
  }

}
