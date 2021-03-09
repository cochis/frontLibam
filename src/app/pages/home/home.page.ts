import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: 'Gracias al esfuerzo de nuestros padres y maestros hemos obtenino varios premios'
    },
    {
      img: '/assets/img/img1.jpg',
      titulo: 'Equipo de olimpiadas del conocimiento ',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/img2.jpg',
      titulo: 'Nuestro equipo docente',
      desc: 'Nuestra plantilla es titulada'
    },
    {
      img: '/assets/img/img3.jpg',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica'
    },
    {
      img: '/assets/img/img4.jpg',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }
    
  ];



  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) { }
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 3000
   };
  ngOnInit() {
    

  }


  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  onClick() {

    this.navCtrl.navigateBack('/');

  }
  
}
