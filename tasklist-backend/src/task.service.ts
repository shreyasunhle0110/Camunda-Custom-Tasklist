import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppService } from "./app.service";
import { taskEntity } from "./tasklist.entity";

@Injectable()
export class TasklistService {
    constructor(@InjectRepository(taskEntity) private tasklistRepo: Repository<taskEntity>, private readonly appService: AppService) { }
    async getCount(id) {
        return this.tasklistRepo.query('select count(*) from task_entity where task_entity."elementInstanceKey" =' + id);
    }
    findAll(): Promise<taskEntity[]> {
        return this.tasklistRepo.find();
    }
    create(newTasklist) {
        this.tasklistRepo.insert(newTasklist);
    }
    async insertdata(data: any) {
        let temp: taskEntity = {
            bpmnProcessId: data.bpmnProcessId,
            elementId: data.elementId,
            elementInstanceKey: data.elementInstanceKey,
            processInstanceKey: data.processInstanceKey,
            processDefinitionKey: data.processDefinitionKey,
            timestamp: data.timestamp,
            variables: data.variables,
            assignee: data.assignee,
            isUpdated: 0
        };
        this.create(temp);
    }
    async getDatatoSaveinDB() {
        this.appService.getAllActiveTasks().then((item) => {
            item.forEach(data => {
                this.getCount(data.elementInstanceKey).then(resp => {
                    if (resp[0].count == 0) {
                        this.insertdata(data);
                    }
                });
            })
        });
    }
    getDataForTasklistUI(){
        return this.findAll();
    }
    claimTask(response) {
        this.tasklistRepo.query('update task_entity set assignee = \''+ response.assignee + '\' where "elementInstanceKey" = ' + response.elementInstanceKey);
    }
    unClaimTask(response) {
        this.tasklistRepo.query('update task_entity set assignee = \'\' where "elementInstanceKey" = ' + response.elementInstanceKey);
    }

}