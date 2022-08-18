import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasklistComponent } from './all-tasks/tasklist/tasklist.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path : '',component : LoginComponent },
  { path : 'tasklist',component : TasklistComponent },
  // { path : 'assigned',component : AssignedTasksComponent },
  // { path : 'unassigned',component : UnAssignedTasksComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
