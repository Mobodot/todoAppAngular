import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Observable, filter, map } from 'rxjs';
import { Todo } from '../types/todo';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../types/filter.enum';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css',
})
export class TodoFooterComponent {
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<string>;
  filterEnum = FilterEnum;

  constructor(private todoService: TodoService) {
    this.activeCount$ = this.todoService.allTodos$.pipe(
      map((todos: Todo[]) => todos.filter((todo) => !todo.isCompleted).length)
    );

    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => ` item${activeCount > 1 ? 's' : ''} left`)
    );

    this.filter$ = this.todoService.filter$;
  }

  changeFilter(filterName: FilterEnum) {
    console.log(`${filterName} was clicked!`);
    this.todoService.changeFilter(filterName);
  }

  clearCompletedTodos() {
    this.todoService.clearCompletedTodos();
  }
}
