import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-cards',
  templateUrl: './oferta-cards.component.html',
  styleUrls: ['./oferta-cards.component.scss'],
})
export class OfertaCardsComponent implements OnInit {
  public size = "px100";
  public speed = "5000";
  slider = [
    {
      page:" oferta",
      img: '/assets/img/numbers/number01.svg',
      titulo: '',
      desc: 'Español, Matemáticas, Conocimiento del medio, Formación Cívica y Ética, Artes, Vida Saludable, Socioemocional, Educación física',
       
    },
    {
      page:" oferta",
      img: '/assets/img/numbers/number02.svg',
      titulo: '',
      desc: 'Español, Matemáticas, Conocimiento del medio, Formación Cívica y Ética, Artes, Vida Saludable, Socioemocional, Educación física',
       
    } ,
    {
      page:" oferta",
      img: '/assets/img/numbers/number03.svg',
      titulo: '',
      desc: 'Español, Matematicas, Ciencias Naturales, La Entidad donde vivo, Formación Cívica y Ética,Artes, Vida Saludable, Socioemocional, Educación física',
       
    } ,
    {
      page:" oferta",
      img: '/assets/img/numbers/number04.svg',
      titulo: '',
      desc: 'Español, Matematicas, Ciencias Naturales, Historia, Geografía, Formación Cívica y Ética,Artes, Vida Saludable, Socioemocional, Educación física',
       
    } ,
    {
      page:" oferta",
      img: '/assets/img/numbers/number05.svg',
      titulo: '',
      desc: 'Español, Matematicas, Ciencias Naturales, Historia, Geografía, Formación Cívica y Ética,Artes, Vida Saludable, Socioemocional, Educación física',
       
    } ,
    {
      page:" oferta",
      img: '/assets/img/numbers/number06.svg',
      titulo: '',
      desc: 'Español, Matematicas, Ciencias Naturales, Historia, Geografía, Formación Cívica y Ética,Artes, Vida Saludable, Socioemocional, Educación física',
    } 

  ];
  constructor(private router: Router) { }
  

  ngOnInit() {}
  navigateTo(link) {
    this.router.navigate([link]);
  }

}
