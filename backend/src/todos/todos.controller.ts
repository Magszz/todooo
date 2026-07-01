import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { TodosDto } from "./dto/todos.dto";
import { JwtAuthGuard } from "../jwtToken/guards/jwt-auth.guard";
import { UserRequest } from "../users/types/user.types";
import { TodosService } from "./todos.service";
import { TodoStatus } from "./enums/todos.enum";
import { UpdateTodo } from "./types/todos.type";

@Controller("todos")
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  // POST /api/v1/todos/create
  @Post("create")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  createTodo(@Body() todoDto: TodosDto, @Request() req: UserRequest) {
    return this.todoService.create(todoDto, req.user.userId);
  }

  // GET /api/v1/todos/all
  @Get("all")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAllTodo(@Request() req: UserRequest) {
    return this.todoService.getAll(req.user.userId);
  }

  // GET /api/v1/todos/search
  @Get("search")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getTodo(
    @Request() req: UserRequest,
    @Param("name") name?: string,
    @Param("status") status?: TodoStatus,
    @Param("createdAt") createdAt?: string,
  ) {
    return this.todoService.getTodo({
      name,
      status,
      createdAt,
      user: req.user.userId,
    });
  }

  // DELETE /api/v1/todos/:id
  @Delete("delete/:id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteTodo(@Param("id") id: string, @Request() req: UserRequest) {
    return this.todoService.deleteTodo(id, req.user.userId);
  }

  // UPDATE[PUT] /api/v1/todos/:id
  @Put("update/:id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  updateTodo(
    @Param("id") id: string,
    @Body() payload: TodosDto,
    @Request() req: UserRequest,
  ) {
    return this.todoService.updateTodo({
      id,
      user: req.user.userId,
      ...payload,
    });
  }
}
