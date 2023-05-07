import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SongDetailComponent, SongFormComponent, SongItemComponent, SongListComponent,MySongsComponent } from './song/index';
import { LoginComponent } from './login.component';
import { UserService } from './user.service';
import { SongService } from './song.service';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register.component';
import { CheckingAuthComponent } from './checking-auth-component/checking-auth-component.component';
import { CommentListComponent } from './song/comment/comment-list.component';
import { CommentItemComponent } from './song/comment/comment-item.component';
import { AddCommentComponent } from './song/comment/add-comment.component';
import { CommentFormComponent } from './song/comment/comment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongDetailComponent,
    SongFormComponent,
    SongListComponent,
    SongItemComponent,
    LoginComponent,
    NavComponent,
    RegisterComponent,
    CheckingAuthComponent,
    MySongsComponent,
    CommentListComponent,
    CommentItemComponent,
    AddCommentComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, UserService, SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
