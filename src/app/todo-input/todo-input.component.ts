import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css',
})
export class TodoInputComponent {
  task: string = '';
  constructor(private todoService: TodoService) {}

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.task = target.value;
  }

  addTodo(): void {
    this.todoService.addTodo(this.task);
    this.task = '';
  }
}
