import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapModule } from './map/map.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./map/map.module').then((m) => m.MapModule), },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
