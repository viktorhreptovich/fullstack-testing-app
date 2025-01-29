export interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpResponse {
  token: string;
}
