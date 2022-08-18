import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { json } from 'stream/consumers';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Post('testPost')
  createPost(@Body() body) {
    //return `Created a new post with values of ${JSON.stringify(body)} 🚀`;
    return this.appService.completeTask(body)
  }
  @Post('login')
  loginController(@Body() body) {
    return this.appService.login(body);
  }

}
