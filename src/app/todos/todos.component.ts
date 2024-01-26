import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoService } from '../services/todo.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs';
import { Todo } from '../types/todo';
import { FilterEnum } from '../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';
import { TodoFooterComponent } from '../todo-footer/todo-footer.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoComponent, TodoFooterComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  visibleTodos$: Observable<Todo[]>;
  editingId: string | null = null;

  constructor(private todoService: TodoService) {
    this.visibleTodos$ = combineLatest([
      this.todoService.allTodos$,
      this.todoService.filter$,
    ]).pipe(
      map(([todos, filter]: [Todo[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  setEditingId(todoId: string) {
    this.editingId = todoId;
  }
}
