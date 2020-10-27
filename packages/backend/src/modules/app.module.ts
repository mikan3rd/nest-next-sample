import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "../controllers/app.controller";
import { TaskModel } from "../models/task.model";
import { TaskContentModel } from "../models/taskContent.model";
import { TaskModule } from "../modules/task.module";
import { TaskContentModule } from "../modules/taskContent.module";
import { DateScalar } from "../scalars/date.scalar";
import { AppService } from "../services/app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "nest_next_sample",
      entities: [TaskModel, TaskContentModel],
      synchronize: false,
    }),
    TaskModule,
    TaskContentModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
