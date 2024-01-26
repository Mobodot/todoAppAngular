import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { BehaviorSubject, map } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  allTodos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(task: string): void {
    if (task) {
      const newTodo: Todo = {
        id: Math.random().toString(16),
        task: task,
        isCompleted: false,
      };
      const updatedTodos = [...this.allTodos$.getValue(), newTodo];
      this.allTodos$.next(updatedTodos);
    }
  }

  toggleCheck(id: string): void {
    const todos = this.allTodos$.getValue();
    let updatedTodos: Todo[] = [];
    todos.forEach((todo: Todo) => {
      if (id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      updatedTodos.push(todo);
    });
    this.allTodos$.next(updatedTodos);
  }

  removeTodo(id: string): void {
    let updatedTodos: Todo[] = this.allTodos$
      .getValue()
      .filter((todo) => id !== todo.id);
    this.allTodos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  clearCompletedTodos() {
    const updatedTodos = this.allTodos$
      .getValue()
      .filter((todo) => !todo.isCompleted);
    this.allTodos$.next(updatedTodos);
  }

  changeTodo(id: string, text: string) {
    let updatedTodos: Todo[] = [];
    this.allTodos$.getValue().map((todo) => {
      if (todo.id === id) {
        todo.task = text;
      }
      updatedTodos.push(todo);
    });
    this.allTodos$.next(updatedTodos);
  }
}
