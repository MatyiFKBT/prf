import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HomeComponent } from './home/home.component';
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitItemComponent } from './habit-item/habit-item.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SongDetailComponent, SongFormComponent,SongItemComponent,SongListComponent } from './song/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HabitListComponent,
    HabitItemComponent,
    HabitFormComponent,
    SongDetailComponent,
    SongFormComponent,
    SongListComponent,
    SongItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
