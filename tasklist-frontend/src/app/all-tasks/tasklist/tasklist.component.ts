import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  columnDefs = [
    {
      headerName: '#',
      width: 40,
      checkboxSelection: true,
    },
    { headerName: 'bpmnProcessId', field: 'bpmnProcessId', resizable: true },
    { headerName: 'elementId', field: 'elementId', resizable: true },
    { headerName: 'elementInstanceKey', field: 'elementInstanceKey', resizable: true },
    { headerName: 'processInstanceKey', field: 'processInstanceKey', resizable: true },
    { headerName: 'processDefinitionKey', field: 'processDefinitionKey', resizable: true },
    { headerName: 'timestamp', field: 'timestamp', resizable: true, },
    { headerName: 'assignee', field: 'assignee', resizable: true },
  ];
  public api!: GridApi;
  public columnApi!: ColumnApi;
  public rowData: any = null;

  private currentUser = localStorage.getItem("currentUser");
  constructor(private http: HttpClient, private router: Router) {
    if (!this.currentUser) {
      this.router.navigate(['/'])
    }
  }
  onGirdReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }
  async ngOnInit(): Promise<void> {
    const data = await this.http.get<any[]>('http://localhost:3000/getTasklistData');
    this.setRowData(data);
  }
  setRowData(data: Observable<any[]>) {
    data.forEach(rowdata => {
      this.api.setRowData(rowdata);
    })
  }
  onCliamClick() {
    var rowNode = this.api.getSelectedNodes()
    if(rowNode.length == 0) {
      alert("Select a task first");
    }
    else{
      let currentAssignee = rowNode[0].data.assignee;
      if(this.currentUser == currentAssignee){
        alert("Task is already assigned to you");
      }
      else{

        let currentElementInstanceKey = rowNode[0].data.elementInstanceKey
        const body = {
          elementInstanceKey : currentElementInstanceKey,
          assignee : this.currentUser
        }
        this.http.post('http://localhost:3000/claimTask',body).subscribe(resp => {
          console.log("Task claimed",resp);
          this.ngOnInit();
          
        })
      }
    }
  }
  onUnclaimClick() {
    var rowNode = this.api.getSelectedNodes()
    if(rowNode.length == 0) {
      alert("Select a task first");
    }else if(rowNode[0].data.assignee != this.currentUser) {
      alert("Cannot unclaim a task which is not assigned to you")
    }

    else{

      let currentElementInstanceKey = rowNode[0].data.elementInstanceKey
        const body = {
          elementInstanceKey : currentElementInstanceKey
        }
        this.http.post('http://localhost:3000/unClaimTask',body).subscribe(resp => {
          console.log("Task unclaimed",resp);
          this.ngOnInit();
          
        })

    }
  
  }
  onCompleteClick() {
    //const dialogRef = dialog

  }


}

