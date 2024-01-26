import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoInputComponent, TodosComponent],
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  sunIconUrl: string = '../assets/images/icon-sun.svg';
}
