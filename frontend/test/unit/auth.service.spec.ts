import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import { ISignUpRequest } from '../../src/types/types';
import { AuthService } from '../../src/services/auth.service';

const BASE_URL = 'http://localhost:3001/api';

describe('AuthService', () => {
  const mockServer = setupServer();

  beforeAll(() => {
    mockServer.listen();
  });

  beforeEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  describe('signUp', () => {
    it('should successfully sign up a user and return access_token and user data', async () => {
      // Given
      mockServer.use(
        http.post(`${BASE_URL}/auth/signup`, () => {
          return HttpResponse.json({
            access_token: 'mock-access-token',
            user: {
              id: 1,
              username: 'testuser',
              email: 'test@example.com',
            },
          });
        }),
      );
      const signUpRequest: ISignUpRequest = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      // When
      const response = await AuthService.signUp(signUpRequest);

      console.log('My data');
      // Then
      expect(response).toBeDefined();
      expect(response?.access_token).toBe('mock-access-token');
      expect(response?.user.id).toBe(1);
      expect(response?.user.username).toBe('testuser');
      expect(response?.user.email).toBe('test@example.com');
    });

    it('should throw an error if request fails', async () => {
      // Given
      mockServer.use(
        http.post(`${BASE_URL}/auth/signup`, () => {
          return HttpResponse.error();
        }),
      );
      const signUpRequest: ISignUpRequest = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123',
      };

      //When&Then
      await expect(AuthService.signUp(signUpRequest)).rejects.toThrowError();
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      // Given
      mockServer.use(
        http.post(`${BASE_URL}/auth/signin`, () => {
          return HttpResponse.json({
            access_token: 'mock-access-token',
            user: {
              id: 1,
              username: 'testuser',
              email: 'test@example.com',
            },
          });
        }),
      );
      const signInRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      // When
      const response = await AuthService.signIn(signInRequest);

      // Then
      expect(response).toBeDefined();
      expect(response?.access_token).toBe('mock-access-token');
      expect(response?.user.id).toBe(1);
      expect(response?.user.username).toBe('testuser');
      expect(response?.user.email).toBe('test@example.com');
    });

    it('should throw an error if request fails', async () => {
      // Given
      mockServer.use(
        http.post(`${BASE_URL}/auth/signin`, () => {
          return HttpResponse.error();
        }),
      );
      const signInRequest = {
        email: 'invalid-email',
        password: 'password123',
      };

      // When&Then
      await expect(AuthService.signIn(signInRequest)).rejects.toThrowError();
    });
  });
});
