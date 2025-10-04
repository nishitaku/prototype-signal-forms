import type {
  FieldPath,
  FieldValidationResult,
  FieldValidator,
} from '../../signal-forms';

export function confirmationPasswordValidator(
  path: FieldPath<{ password: string }>
): FieldValidator<string> {
  return ({ value, valueOf }) => {
    return value() === valueOf(path.password)
      ? undefined
      : ({ kind: 'confirmationPassword' } as FieldValidationResult);
  };
}
