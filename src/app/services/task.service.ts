import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 101,
      title: 'create ui',
      description: 'please create ui for login screen',
      dueDate: '2024-07-12T18:30:00.000Z',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: 102,
      title: 'update dashboard',
      description: 'please update dashboard data',
      dueDate: '2024-07-12T18:30:00.000Z',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: 103,
      title: 'create table',
      description: 'please create table to add all tasks',
      dueDate: '2024-07-12T18:30:00.000Z',
      status: 'completed',
      priority: 'low',
    },
    {
      id: 104,
      title: 'create table',
      description: 'please create table to add all tasks',
      dueDate: '2024-07-17T18:30:00.000Z',
      status: 'inProgress',
      priority: 'high',
    },
  ];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  getTasks() {
     this.tasksSubject.next(this.tasks);
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push({ ...task, id: this.tasks.length + 101 });
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  searchTasks(query: string) {
    const filteredTasks = this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
    this.tasksSubject.next(filteredTasks);
  }

  filterByPriority(priority: 'low' | 'medium' | 'high' | '') {
    if (priority) {
    const filteredTasks = this.tasks.filter(
      (task) => task.priority === priority
    );
    this.tasksSubject.next(filteredTasks);
  }else{
    this.tasksSubject.next(this.tasks);
  }
  }

  filterByStastus(status: 'pending' | 'inProgress' | 'completed'| '') {
    if (status) {
      const filteredTasks = this.tasks.filter((task) => task.status === status);
      this.tasksSubject.next(filteredTasks);
    } else {
      this.tasksSubject.next(this.tasks);
    }
  }
}
