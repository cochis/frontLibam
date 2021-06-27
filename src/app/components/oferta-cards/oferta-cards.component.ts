import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-cards',
  templateUrl: './oferta-cards.component.html',
  styleUrls: ['./oferta-cards.component.scss'],
})
export class OfertaCardsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  navigateTo(link) {
    this.router.navigate([link]);
  }

}
