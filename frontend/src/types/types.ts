export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface ISignUpResponse {
  access_token: string;
  user: IUser;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse {
  access_token: string;
  user: IUser;
}
