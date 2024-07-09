import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  searchQuery: string = '';
  priorityFilter: 'low' | 'medium' | 'high' | '' = '';
  statusFilter: 'pending' | 'inProgress' | 'completed' | '' = '';
  displayedColumns: string[] = ['srno', 'title', 'description', 'dueDate','status','priority','star'];
  constructor(private taskService: TaskService,private router: Router) {}

  ngOnInit() {
  this.getTasks()
  }

  getTasks(){
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.getTasks()
  }

  updateTask(id: number){
    this.router.navigateByUrl(`/edit/${id}`)
    this.getTasks()
  }
  searchTasks() {
    this.taskService.searchTasks(this.searchQuery);
  }

  filterByPriority() {
    if (this.priorityFilter) {
      this.taskService.filterByPriority(this.priorityFilter);
    } else {
      this.getTasks()
    }
  }

  filterByStatus(){
      this.taskService.filterByStastus(this.statusFilter);
  }


}
