import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BusinessComponent } from './component/business/business.component';
import { BusinessListComponent } from './component/business/business-list/business-list.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminRegisterComponent } from './component/admin/admin-register/admin-register.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'business', component: BusinessComponent, children: [
      {
        path: 'artists', component: BusinessListComponent
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      {
        path: 'artists/new', component: AdminRegisterComponent
      }
    ]
  },
    //PRUEBA - ESTE SI CUMPLE CON LA RUTA (CON EL ID UWU)
  {
    path: 'admin/artists/edit/:id', component: AdminRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
