import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObject: Task = new Task();
  taskArray: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObject = new Task();
    this.taskArray = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(result => {
      this.taskArray = result;
    }, error => {
      alert('Unable to get list of tasks' + error)
    })
  }

  addTask() {
    this.taskObject.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskObject).subscribe(result => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, error => { alert(error); })
  }

  editTask() {
    this.taskObject.taskName = this.editTaskValue
    this.crudService.editTask(this.taskObject).subscribe(result => {
      this.ngOnInit();
    }, error => { alert('Failed to update task.' + error); })
  }

  deleteTask(editTask: Task) {
    this.crudService.deleteTask(editTask).subscribe(result => {
      this.ngOnInit();
    }, error => { alert('Failed to delete task.' + error); })
  }

  call(editTask: Task) {
    this.taskObject = editTask;
    this.editTaskValue = editTask.taskName;
  }
}
