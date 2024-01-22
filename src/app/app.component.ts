import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import e from 'express';

interface Todo {
  id: string;
  task: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  allTodos: Todo[] = [];
  todos: Todo[] = [];
  counter: number = 0;
  current: string = 'all';

  onEnter(inputElement: HTMLInputElement) {
    if (inputElement.value) {
      this.todos.push({
        id: Math.random().toString(16),
        task: inputElement.value,
        isCompleted: false,
      });
      inputElement.value = '';
      this.counter++;
      this.allTodos = this.todos;
    }
    // console.log(this.todos);
  }

  toggleCheck(id: string): void {
    // console.log(`todo id ${id} was clicked`);
    this.allTodos.forEach((todo) => {
      if (todo.id === id) {
        if (todo.isCompleted) {
          todo.isCompleted = false;
          this.counter++;
        } else {
          todo.isCompleted = true;
          this.counter--;
        }
      }
    });
    // console.log(this.todos);
  }

  removeTodo(id: string): void {
    this.todos = this.allTodos.filter((todo) => todo.id !== id);
    this.allTodos = this.todos;
    // this.counter--;
    this.counter = this.todos.length;
  }

  viewAllTodos(): void {
    console.log('viewAllTodos was clicked');
    this.todos = this.allTodos;
    this.current = 'all';
  }

  viewActiveTodos(): void {
    console.log('viewActive todos was clicked');
    this.todos = this.allTodos.filter((todo) => todo.isCompleted == false);
    this.current = 'active';
  }

  viewCompletedTodos(): void {
    this.todos = this.allTodos.filter((todo) => todo.isCompleted === true);
    this.current = 'completed';
  }

  clearCompletedTodos(): void {
    this.todos = this.allTodos.filter((todo) => todo.isCompleted === false);
    this.allTodos = this.todos;
  }
}
