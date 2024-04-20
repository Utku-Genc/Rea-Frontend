import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;

  constructor( private formBuilder:FormBuilder,
    private authService:AuthService,
  private localStorageService:LocalStorageService){

  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }


  register() {
    if (this.registerForm.valid) { 
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        console.log("kayıt başarılı")
        this.localStorageService.remove("token");
        this.localStorageService.setItem("token", response.data.token);
      }, responseError=>{
        console.log("hata: "+responseError)
      });
    } else {
      console.log("Tüm Alanları Doldurun")
    }

  }
}
