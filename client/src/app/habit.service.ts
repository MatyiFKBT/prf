import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Habit } from './habit';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  habits: Habit[] = [
    { id: 1, name: 'Drink Water', count: 0 },
    { id: 2, name: 'Eat Fruit', count: 0 },
    { id: 3, name: 'Exercise', count: 0 },
    { id: 4, name: 'Meditate', count: 0 },
  ];

  constructor(private http: HttpClient) { }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>('/api/songs/all');
  }

  addHabit(habit: string) {
    const id  = this.habits.length + 1;
    this.habits.push({ id, name: habit, count: 0 });

  }

}
