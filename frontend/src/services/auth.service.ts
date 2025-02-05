import { ISignInRequest, ISignInResponse, ISignUpRequest, ISignUpResponse } from '../types/types.ts';
import { apiClient } from '../api/axios.api.ts';

export const AuthService = {
  async signUp(signUpRequest: ISignUpRequest): Promise<ISignUpResponse | undefined> {
    const { data } = await apiClient.post<ISignUpResponse>('auth/signup', signUpRequest);
    return data;
  },

  async signIn(signInRequest: ISignInRequest): Promise<ISignInResponse | undefined> {
    const { data } = await apiClient.post<ISignUpResponse>('auth/signin', signInRequest);
    return data;
  },
};
