import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './site/pages/login/login.module';

const routes: Routes = [
 
 
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
   
  {
    path: 'site/loginSite',
    loadChildren: () => import('./site/pages/login/login.module').then( m => m.LoginPageModule)
  },
   
  {
    path: 'conocenos',
    loadChildren: () => import('./pages/conocenos/conocenos.module').then( m => m.ConocenosPageModule)
  },
  {
    path: 'oferta',
    loadChildren: () => import('./pages/oferta/oferta.module').then( m => m.OfertaPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'home-site',
    loadChildren: () => import('./site/pages/home-site/home-site.module').then( m => m.HomeSitePageModule)
  },
  {
    path: 'inscripcion',
    loadChildren: () => import('./pages/inscripcion/inscripcion.module').then( m => m.InscripcionPageModule)
  },
  {
    path: 'reinscripcion',
    loadChildren: () => import('./pages/reinscripcion/reinscripcion.module').then( m => m.ReinscripcionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
