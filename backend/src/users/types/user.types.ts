export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}

export interface UserRequest {
  user: {
    userId: string;
    email: string;
  };
}
