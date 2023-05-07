import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongListComponent, SongDetailComponent, SongFormComponent, MySongsComponent } from './song/index';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CheckingAuthComponent } from './checking-auth-component/checking-auth-component.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'songs', component: SongListComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'check-auth', component: CheckingAuthComponent},
  { path: 'me', component: MySongsComponent},
  { path: 'songs/new', component: SongFormComponent, canActivate: [AuthGuard] },
  { path: 'songs/:id', component: SongDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
