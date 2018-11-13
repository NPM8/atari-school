import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MagazinePageComponent} from './components/magazine-page/magazine-page.component';
import {MagazinesListComponent} from './components/magazines-list/magazines-list.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: ':mag',
        component: MagazinePageComponent
    },
    {
        path: ':mag/:year',
        component: MagazinesListComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
