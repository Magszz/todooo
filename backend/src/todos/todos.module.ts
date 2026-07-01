import { Module } from "@nestjs/common";
import { TodosController } from "./todos.controller";
import { JWTTokenModule } from "../jwtToken/jwtToken.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Todos, TodosSchema } from "./schemas/todos.schema";
import { TodosService } from "./todos.service";

@Module({
  imports: [
    JWTTokenModule,
    MongooseModule.forFeature([{ name: Todos.name, schema: TodosSchema }]),
  ],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
