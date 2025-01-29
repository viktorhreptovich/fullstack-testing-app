import { ConflictException } from '@nestjs/common';

export default class DuplicateCategoryException extends ConflictException {
  constructor(title: string, userId: number) {
    super(`Category "${title}" already exists for user: ${userId}`);
  }
}
