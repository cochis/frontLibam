import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  constructor() { }
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: 'Gracias al esfuerzo de nuestros padres y maestros hemos obtenino varios premios'
    },
    {
      img: '/assets/img/ninos2.png',
      titulo: 'Equipo de olimpiadas del conocimiento ',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/ninos2.png',
      titulo: 'Nuestro equipo docente',
      desc: 'Nuestra plantilla es titulada'
    },
    {
      img: '/assets/img/ninos2.png',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica'
    },
    {
      img: '/assets/img/ninos2.png',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }
    
  ];
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 5000
   };

  ngOnInit() {}

}
