import { ConflictException } from '@nestjs/common';

export default class DuplicateEmailException extends ConflictException {
  constructor(email: string) {
    super(`Email "${email}" already in use`);
  }
}
