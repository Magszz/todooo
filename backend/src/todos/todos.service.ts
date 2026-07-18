import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TodosDto } from "./dto/todos.dto";
import { Todos, TodosDocument } from "./schemas/todos.schema";
import { Model } from "mongoose";
import { QueryTodo, ParamsTodo, UpdateTodo } from "./types/todos.type";
import { TodoStatus } from "./enums/todos.enum";

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todos.name) private readonly todoModel: Model<TodosDocument>,
  ) {}

  async create(payload: TodosDto, userId: string) {
    try {
      const res = await this.todoModel.create({ ...payload, user: userId });

      return {
        data: res,
        message: "Successfully created!",
      };
    } catch (err) {
      throw err;
    }
  }

  async getAll(userId: string) {
    try {
      const res = await this.todoModel.find({ user: userId }).lean().exec();

      return {
        data: res,
        message: "ok",
      };
    } catch (err) {
      throw err;
    }
  }

  async getTodo(params: ParamsTodo) {
    try {
      const { name, status, createdAt, user } = params || {};

      const query: QueryTodo = {
        user,
      };

      if (name) query.name = { $regex: name, $options: "i" };
      if (status) query.status = status;
      if (createdAt) {
        const startOfDay = new Date(createdAt);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(createdAt);
        endOfDay.setUTCHours(23, 59, 59, 999);
        query.createdAt = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      }

      const res = await this.todoModel.find(query).lean().exec();

      return {
        data: res,
        message: "ok",
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteTodo(todoId: string, userId: string) {
    try {
      const todoItem = await this.todoModel
        .findOne({ _id: todoId, user: userId })
        .lean()
        .exec();

      if (!todoItem) return new NotFoundException("Todo not found");

      await this.todoModel.deleteOne({ _id: todoId }).exec();

      return { message: "Todo deleted successfully", status: "ok" };
    } catch (err) {
      throw err;
    }
  }

  async updateTodo(params: UpdateTodo) {
    try {
      const { id, ...restQueries } = params || {};
      const query: UpdateTodo = restQueries;

      const isExist = await this.todoModel.findOne({ _id: id });

      if (!isExist) return new NotFoundException("Todo not found");

      const res = await this.todoModel.findOneAndUpdate(
        {
          _id: id,
          user: restQueries.user,
        },
        { $set: query },
        { new: true, runValidators: true },
      );

      return {
        data: res,
        message: "ok",
      };
    } catch (err) {
      throw err;
    }
  }

  async getTodoStatus() {
    try {
      const statusObj = Object.entries(TodoStatus).map(([key, value]) => {
        if (key === "WIP")
          return {
            label: "Work-In-Progress",
            value: value,
          };

        return {
          label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          value,
        };
      });

      return {
        data: statusObj,
        message: "ok",
      };
    } catch (err) {
      throw err;
    }
  }
}
