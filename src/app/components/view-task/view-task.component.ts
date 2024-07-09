import { Component, inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit{
  data = inject<any>(MAT_DIALOG_DATA);
  constructor(
    public dialogRef: MatDialogRef<ViewTaskComponent>,
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
