import { Component, ElementRef, ViewChild } from '@angular/core';
import { HouseListing } from '../../models/houseListing';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  images: string[] = [
    '../../../assets/img/1.jpg',
    '../../../assets/img/2.jpg',
    '../../../assets/img/3.jpg',
    '../../../assets/img/4.jpg',
    '../../../assets/img/5.jpg',
    '../../../assets/img/6.jpg',
    '../../../assets/img/7.jpg',
    '../../../assets/img/8.jpg',
    '../../../assets/img/9.jpg',
    '../../../assets/img/10.png',
    '../../../assets/img/4.jpg',
    '../../../assets/img/5.jpg',
    '../../../assets/img/6.jpg',
    '../../../assets/img/7.jpg',
    '../../../assets/img/8.jpg',
    '../../../assets/img/9.jpg',
    '../../../assets/img/10.png',
  ];
  startIndex = 0;
  endIndex = 5;
  visibleImages: string[] = [];

  constructor() { }

  ngOnInit() {
    this.showImages();
  }

  next() {
    if (this.endIndex < this.images.length) {
      this.startIndex += 5;
      this.endIndex += 5;
      this.showImages();
    }
  }

  previous() {
    if (this.startIndex > 0) {
      this.startIndex -= 5;
      this.endIndex -= 5;
      this.showImages();
    }
  }

  showImages() {
    this.visibleImages = this.images.slice(this.startIndex, this.endIndex);
    this.imageContainer.nativeElement.scrollLeft = 0; // Her seferinde scroll pozisyonunu sıfırla
  }
  showImageInCarousel(index: number) {
    const carousel = document.getElementById('carouselExampleRide');
    const carouselItems = carousel?.querySelectorAll('.carousel-item');
    if (carouselItems && index >= 0 && index < carouselItems.length) {
      carouselItems.forEach((element, i) => {
        // Tüm resimlerden 'active' sınıfını kaldır
        element.classList.remove('active');
        // Tıklanan resmin slaydını 'active' yap
        if (i === index) {
          element.classList.add('active');
        }
      });
    }
  }



}