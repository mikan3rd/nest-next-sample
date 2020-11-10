import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "../controllers/app.controller";
import { CategoryModel } from "../models/category.model";
import { TaskModel } from "../models/task.model";
import { TaskContentModel } from "../models/taskContent.model";
import { CategoryModule } from "../modules/category.module";
import { TaskModule } from "../modules/task.module";
import { TaskContentModule } from "../modules/taskContent.module";
import { DateScalar } from "../scalars/date.scalar";
import { AppService } from "../services/app.service";

type EnvironmentVariables = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: "nest_next_sample",
        entities: [TaskModel, TaskContentModel, CategoryModel],
        synchronize: false,
      }),
    }),
    TaskModule,
    TaskContentModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
