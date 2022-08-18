import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { response } from "express";
import { TasklistService } from "./task.service";
import { taskEntity } from "./tasklist.entity";

@Controller()
export class TasklistController {
    constructor (private readonly tasklistService : TasklistService) { } 

    @Get('all')
    async getAllTasks () :Promise <taskEntity[]> {
        return this.tasklistService.findAll();
    }
    @Post('add')
    @HttpCode(201)
    createTasklist(@Body() newTasklist : any) {
        console.log(newTasklist);
        
        this.tasklistService.create(newTasklist)
    }
    @Get('saveDatainDB')
    saveDatainDB() {
        return this.tasklistService.getDatatoSaveinDB();
    }

    @Get('getTasklistData')
    gettaskdata(){
      return this.tasklistService.getDataForTasklistUI();
    }

    @Post('claimTask')
    @HttpCode(201)
    claimTask(@Body() response : any) {
        this.tasklistService.claimTask(response);
    }
    @Post('unClaimTask')
    @HttpCode(201)
    unClaimTask(@Body() response : any) {
        this.tasklistService.unClaimTask(response);
    }
   

}