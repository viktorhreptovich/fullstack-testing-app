import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from '../../src/services/auth.service.ts';
import { ISignUpRequest, ISignUpResponse } from '../../src/types/types.ts';
import { pact, Pact } from '../utils/pact.utils.ts';
import { AxiosError } from 'axios';

describe('AuthService pact tests', () => {
  describe('SignUp', () => {
    let provider: Pact;

    beforeEach(async () => {
      provider = pact({ consumer: 'AuthService', provider: 'AuthController' });
    });

    afterEach(async ({ task }) => {
      await provider.attachContract(task.name);
    });

    it('a request to sign up with a new email', async ({ task }) => {
      const signUpRequest: ISignUpRequest = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      const signUpResponse: ISignUpResponse = {
        access_token: 'mock-access-token',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
        },
      };

      provider
        .given('user is not in use', {
          user: { ...signUpResponse.user },
        })
        .uponReceiving(task.name)
        .withRequest({
          method: 'POST',
          path: '/api/auth/signup',
          headers: {
            'Content-Type': 'application/json',
          },
          body: signUpRequest,
        })
        .willRespondWith({
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
          body: signUpResponse,
        });

      await provider.executeTest(async () => {
        const response = await AuthService.signUp(signUpRequest);
        expect(response?.access_token).toBeDefined();
        expect(response?.user).to.deep.equal(signUpResponse.user);
      });
    });

    it('a request to sign up with an existing email', async ({ task }) => {
      const signUpRequest: ISignUpRequest = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password123',
      };

      provider
        .given('user is already in use', { user: { id: 1, ...signUpRequest } })
        .uponReceiving(task.name)
        .withRequest({
          method: 'POST',
          path: '/api/auth/signup',
          headers: {
            'Content-Type': 'application/json',
          },
          body: signUpRequest,
        })
        .willRespondWith({
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            message: 'Email "existing@example.com" already in use',
            error: 'Conflict',
            statusCode: 409,
          },
        });

      await provider.executeTest(async () => {
        try {
          const response = await AuthService.signUp(signUpRequest);
          expect(response).toBeUndefined();
        } catch (error: any) {
          expect(error).toBeInstanceOf(AxiosError);
          expect(error.message).toBe('Request failed with status code 409');
          expect(error.response.status).toBe(409);
          expect(error.response.data.message).toBe('Email "existing@example.com" already in use');
          expect(error.response.data.error).toBe('Conflict');
          expect(error.response.data.statusCode).toBe(409);
        }
      });
    });
  });
});
