export interface SigninAuthResponseDto {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
