import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongListComponent,SongDetailComponent } from './song/index';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'songs', component: SongListComponent },
  { path: 'songs/:id', component: SongDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
