import type { FieldValidationResult, FieldValidator } from '../../signal-forms';

export const emailValidator: FieldValidator<string> = ({ value }) => {
  return value().includes('@')
    ? undefined
    : ({ kind: 'email' } as FieldValidationResult);
};
