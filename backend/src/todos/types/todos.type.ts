import { TodoStatus } from "../enums/todos.enum";
export interface Todo {
  status?: TodoStatus;
  user: string;
}

export interface ParamsTodo extends Todo {
  createdAt?: string;
  name?: string;
}

export interface QueryTodo extends Todo {
  createdAt?: {
    $gte: Date;
    $lte: Date;
  };
  name?: {
    $regex: string;
    $options: string;
  };
}

export interface UpdateTodo {
  title: string;
  user: string;
  description?: string;
  status: TodoStatus;
  id?: string;
}
