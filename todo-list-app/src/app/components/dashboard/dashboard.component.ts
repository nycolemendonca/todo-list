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

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskObject = new Task();
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(result => {
      this.taskArray = result;
    }, error => {
      alert('Unable to get list of tasks' + error)
    })
  }

  addTask(addTask: Task) {
    this.crudService.addTask(addTask).subscribe(result => {
      this.ngOnInit();
    }, error => { alert(error); })
  }

  editTask() {
    this.crudService.editTask(this.taskObject).subscribe(result => {
      this.ngOnInit();
    }, error => { alert('Failed to update task.' + error); })
  }

  deleteTask(editTask: Task) {
    this.crudService.deleteTask(editTask).subscribe(result => {
      this.ngOnInit();
    }, error => { alert('Failed to delete task.' + error); })
  }
}
