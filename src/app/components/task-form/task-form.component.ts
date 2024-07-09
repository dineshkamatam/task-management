
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId: any;
  listStatus:string[] = ['pending' , 'inProgress' , 'completed']
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required]
    });
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    if (this.taskId) {
      this.taskService.getTasks().subscribe(tasks => {
        const task = tasks.find(t => t.id === +this.taskId);
        if (task) {
          this.taskForm.patchValue(task);
        }
      });
    }
  }

  save() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (this.taskId) {
        task.id = Number(this.taskId) ;
        this.taskService.updateTask(task);
        this.router.navigateByUrl('/dashboard')
      } else {
        this.taskService.addTask(task);
        this.router.navigateByUrl('/dashboard')
      }
      
    }
  }
}
