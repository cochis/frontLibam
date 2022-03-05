import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() slider: any;
  @Input() size?: any;
  @Input() speed?: number;
  public slides: any;
  constructor(private router: Router) {
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 15000
  };

  ngOnInit() {
    this.slides = this.slider;
  }

  navigateTo(link) {
    this.router.navigate([link]);
  }
}
