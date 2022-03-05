import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './site/pages/login/login.module';

const routes: Routes = [
 
 
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
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
    path: 'inscripcion',
    loadChildren: () => import('./pages/inscripcion/inscripcion.module').then( m => m.InscripciónPageModule)
  },
  // {
  //   path: 'reinscripcion',
  //   loadChildren: () => import('./pages/reinscripcion/reinscripcion.module').then( m => m.ReinscripcionPageModule)
  // },
  // {
  //   path: 'blog',
  //   loadChildren: () => import('./pages/blog/blog.module').then( m => m.BlogPageModule)
  // },
  {
    path: 'site/register',
    loadChildren: () => import('./site/pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'site/login',
    loadChildren: () => import('./site/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'site/home-site',
    loadChildren: () => import('./site/pages/home-site/home-site.module').then( m => m.HomeSitePageModule)
  },
  {
    path: 'site/verify-email',
    loadChildren: () => import('./site/pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'site/informacion-estudiante',
    loadChildren: () => import('./site/pages/recopilacion/informacion-estudiante/informacion-estudiante.module').then( m => m.InformacionEstudiantePageModule)
  },
  {
    path: 'site/informacion-tutor',
    loadChildren: () => import('./site/pages/recopilacion/informacion-tutor/informacion-tutor.module').then( m => m.InformacionTutorPageModule)
  },
  {
    path: 'site/informacion-curso',
    loadChildren: () => import('./site/pages/recopilacion/informacion-curso/informacion-curso.module').then( m => m.InformacionCursoPageModule)
  },   {
    path: 'site/views/students',
    loadChildren: () => import('./site/pages/views/students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'site/informacion-profesor',
    loadChildren: () => import('./site/pages/recopilacion/informacion-profesor/informacion-profesor.module').then( m => m.InformacionProfesorPageModule)
  },
  {
    path: 'site/informacion-clase',
    loadChildren: () => import('./site/pages/recopilacion/informacion-clase/informacion-clase.module').then( m => m.InformacionClasePageModule)
  },
  {
    path: 'site/views/profesors',
    loadChildren: () => import('./site/pages/views/profesors/profesors.module').then( m => m.ProfesorsPageModule)
  },
  {
    path: 'site/views/courses',
    loadChildren: () => import('./site/pages/views/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'site/views/classrooms',
    loadChildren: () => import('./site/pages/views/classrooms/classrooms.module').then( m => m.ClassroomsPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
