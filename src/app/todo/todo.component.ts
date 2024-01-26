import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../types/todo';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input('todo') todoProps!: Todo;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string> =
    new EventEmitter();

  editingText: string = '';
  checkImgUrl: string = '../assets/images/icon-check.svg';
  closeImgUrl: string = '../assets/images/icon-cross.svg';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.editingText = this.todoProps.task;
  }

  toggleCheck(id: string): void {
    this.todoService.toggleCheck(id);
  }

  removeTodo(id: string): void {
    this.todoService.removeTodo(id);
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  changeText(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.editingText = text;
  }

  changeTodo() {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(undefined);
  }
}
