import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasklistService } from './task.service';
import { TasklistController } from './tasklist.controller';
import { taskEntity } from './tasklist.entity';

@Module({
  imports: [ConfigModule,
    ElasticsearchModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async () => ({
          node: 'http://localhost:9200',
          maxRetries: 10,
          requestTimeout:60000,
          }),
          inject:[ConfigService],
      }),
      TypeOrmModule.forRoot({
        type :'postgres',
        host : '127.0.0.1',
        port : 5432,
        username : 'postgres',
        password :'postgres',
        database : 'Tasklist',
        entities : [taskEntity],
        synchronize: true

      }),
      TypeOrmModule.forFeature([taskEntity])
  ],
  controllers: [AppController,TasklistController],
  providers: [AppService,ElasticsearchModule,TasklistService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly tasklistService : TasklistService) {}
  onModuleInit() {
    this.tasklistService.getDatatoSaveinDB();
    console.log("dataload Successfully");
  }
}
