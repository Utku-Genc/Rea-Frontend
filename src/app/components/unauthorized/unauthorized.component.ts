import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent implements OnInit, OnDestroy {

  countdown: number = 10;
  interval: any;

  constructor(
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.startCountdown();
  }
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.redirectToHomepage();
      }
    }, 1000);
  }

  redirectToHomepage(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.toastrService.info("Anasayfaya yönlendirildiniz!","Bilgilendirme")
    this.router.navigate(['/']); // Change '/' to your homepage route
  }
}
