import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { CategoryModule } from "@/modules/category.module";
import { TaskModule } from "@/modules/task.module";
import { TaskContentModule } from "@/modules/taskContent.module";
import { DateScalar } from "@/scalars/date.scalar";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    TaskModule,
    TaskContentModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
