const key = 'token';

export function getAccessTokenFromLocalStorage(): string {
  return localStorage.getItem(key) || '';
}

export function setAccessTokenToLocalStorage(token: string): void {
  localStorage.setItem(key, token);
}

export function removeAccessTokenFromLocalStorage(): void {
  localStorage.removeItem(key);
}