import { AbstractControl, ValidationErrors } from '@angular/forms';

// Checks for a real email format: name@domain.extension
// Not too strict (allows most valid emails), not too loose (rejects "a@b")
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;

  return EMAIL_REGEX.test(control.value) ? null : { email: true };
}
