import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { TodoStatus } from "../enums/todos.enum";

export type TodosDocument = HydratedDocument<Todos>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: false } })
export class Todos {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ enum: TodoStatus, default: TodoStatus.PENDING })
  status: TodoStatus;

  // The "foreign key" - indexed because we'll query by this constantly
  @Prop({ type: Types.ObjectId, ref: "User", required: true, index: true })
  user: Types.ObjectId;

  createdAt?: Date; // populated automatically by the timestamps option above
}

export const TodosSchema = SchemaFactory.createForClass(Todos);
