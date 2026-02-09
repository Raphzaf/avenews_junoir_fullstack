import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Cross-field validator that ensures phone verification field matches primary phone.
 * Should be used at FormGroup level.
 * 
 * @example
 * this.fb.group({
 *   phoneNumber: [''],
 *   verifyPhone: ['']
 * }, { validators: phoneMatchValidator })
 */
export function phoneMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const phone = group.get('phoneNumber')?.value;
  const verify = group.get('verifyPhone')?.value;

  if (phone && verify && phone !== verify) {
    group.get('verifyPhone')?.setErrors({ phoneMismatch: true });
    return { phoneMismatch: true };
  }

  // Only clear phoneMismatch error, preserve other errors
  const verifyControl = group.get('verifyPhone');
  if (verifyControl?.errors?.['phoneMismatch']) {
    const { phoneMismatch, ...remainingErrors } = verifyControl.errors;
    verifyControl.setErrors(
      Object.keys(remainingErrors).length ? remainingErrors : null
    );
  }

  return null;
}