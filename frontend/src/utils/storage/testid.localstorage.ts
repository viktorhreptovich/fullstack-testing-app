const key = 'test-id';

export function getTestIdFromLocalStorage(): string {
  return localStorage.getItem(key) || '';
}
