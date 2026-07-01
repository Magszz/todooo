import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { RegisterUser } from "./types/user.types";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(data: RegisterUser): Promise<UserDocument> {
    const user = new this.userModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.hashedPassword,
    });

    return user.save();
  }

  async userProfile(userId: string) {
    const userProfile = await this.userModel
      .findById(userId)
      .select("-password")
      .exec();

    return {
      data: userProfile,
      message: "ok",
    };
  }
}
