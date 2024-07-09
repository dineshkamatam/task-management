import { Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  constructor(private taskService: TaskService) {
    this.checkDueDates();
  }

  checkDueDates() {
    this.taskService.getTasks().subscribe(tasks => {
      const now = new Date();
      tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        if (dueDate.getTime() - now.getTime() < 86400000 && dueDate.getTime() > now.getTime()) {
          alert(`Task "${task.title}" is due soon!`);
        }
      });
    });
  }
}
