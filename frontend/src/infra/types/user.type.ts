export interface User {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  createdAt?: Date;
}

export interface GetUserResponse {
  data: User;
  message: string;
}
