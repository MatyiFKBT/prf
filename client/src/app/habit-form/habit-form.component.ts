import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-habit-form',
  template: `
    <form [formGroup]="habitForm" (ngSubmit)="onSubmit(habitForm.value)">
      <input type="text" placeholder="Add habit" formControlName="title" />
      <button type="submit">Add</button>
    </form>
  `,
  styles: [
  ]
})
export class HabitFormComponent {
  habitForm: any;
  @Output() addHabit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.habitForm = this.formBuilder.group({
      title: '',
    });
  }

  onSubmit(habit: any) {
    this.addHabit.emit(habit.title);
    this.habitForm.reset();
  }
}
