import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoggedIn: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router:Router,
  ) {

  }

  ngOnInit(): void {
    this.createRegisterForm();
    const isAlreadyLoggedIn = this.isLoggedIn
      this.isLoggedIn = this.authService.isAuthenticated();
      console.log(isAlreadyLoggedIn+"  "+this.isLoggedIn)
      if(isAlreadyLoggedIn == true && isAlreadyLoggedIn != this.isLoggedIn){
        this.toastrService.info("Token süreniz doldu tekrardan giriş yapiniz","Lütfen Tekrardan Giriş Yapınız")
        this.router.navigate(["login"])
      }
      if (this.isLoggedIn) {
        this.toastrService.info("Oturumunuz açık olduğu için anasayfaya yönlendiriliyorsunuz...","Bilgilendirme")
        this.router.navigate(["/"])
      }
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        console.log("kayıt başarılı")
        this.localStorageService.remove("token");
        this.localStorageService.remove("expiration")
        this.localStorageService.setItem("token", response.data.token);
        this.localStorageService.setItem("expiration", response.data.expiration)
        window.location.href = "/";
      }, responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          console.log(responseError.error.ValidationErrors)
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      });
    } else {
      this.toastrService.error("Lütfen Tüm Alanları Doldurun", "Dikkat!");
    }

  }
}
