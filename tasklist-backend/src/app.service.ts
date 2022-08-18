import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { TasklistService } from './task.service';
import { taskEntity } from './tasklist.entity';


@Injectable()
export class AppService {

  userTaskList: any = [];
  finalResult: any = [];
  currentAssignee: any;
  date: Date;
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly esService: ElasticsearchService) { }

  getDatafromES() {
    const body = {
      size: 10000
    }
    return this.esService.search({ index: 'zeebe-record_job*', body })
      .then(res => res.hits.hits)
      .catch(err => { throw new HttpException(err, 500) })

  }

  async getAllActiveTasks() {
    this.finalResult = [];
    this.esService.indices.putMapping
    this.userTaskList = [];
    const allTasks = await this.getDatafromES();
    allTasks.map((item: any) => {
      for (var key in item._source.value.customHeaders) {
        this.currentAssignee = item._source.value.customHeaders[key];
      }
      this.date = new Date(item._source.timestamp)
      const data: any = item._source;
      if (data.value.type == 'io.camunda.zeebe:userTask') {
        this.userTaskList.push({
          bpmnProcessId: data.value.bpmnProcessId,
          elementId: data.value.elementId,
          elementInstanceKey: data.value.elementInstanceKey,
          processInstanceKey: data.value.processInstanceKey,
          processDefinitionKey: data.value.processDefinitionKey,
          timestamp: this.date.toString(),
          variables: data.value.variables,
          assignee: this.currentAssignee,
          intent: data.intent
        })
      }
    });
    const filterData = this.userTaskList.filter((item) => {
      return (item.intent === 'CREATED')
    });
    filterData.map((item) => {
      if (!this.isTaskAlreadyCompleted(item.elementInstanceKey, this.userTaskList)) {
        this.finalResult.push(item);
      }
    });

    return this.finalResult;
  }
  isTaskAlreadyCompleted(elementInstanceKey: any, userTaskList: any) {
    let flag = false;
    const result = userTaskList.map((item) => {
      if (item.elementInstanceKey === elementInstanceKey && item.intent === 'COMPLETED') {
        flag = true;
        return flag;
      }
    });
    return flag;
  }

  completeTask(body: any) {
    
  }
  
  login(userInput) {
    const flag = this.isUserPresent(userInput);
    console.log(flag);
    
    if(flag) {
      const response = {
        username : userInput.username
      }
      return  response;
    }
    else {
      const response = {
        username : "Not A User"
      }
      return response;
    } 
      
    
  }
  isUserPresent(userInput): boolean {
    let loginFlag = false;
    const data = [
      {
          Username : 'shreyas',
          Password : 'qwerty'
      },
      {
          Username : 'demo',
          Password : 'qwerty'
      },
      {
          Username : 'approver1',
          Password : 'qwerty'
      },
      {
          Username : 'approver2',
          Password : 'qwerty'
      }
  ];
    data.forEach(item => {
      if (item.Username == userInput.username && item.Password == userInput.password) {
        loginFlag = true;
        return loginFlag
      }
    })
    return loginFlag
  }
}
