import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: false } })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed, never returned to the client

  createdAt?: Date; // populated automatically by the timestamps option above
}

export const UserSchema = SchemaFactory.createForClass(User);
