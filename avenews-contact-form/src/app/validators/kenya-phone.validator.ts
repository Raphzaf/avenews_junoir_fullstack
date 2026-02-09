import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validates Kenyan phone numbers.
 * User inputs 7 digits, validator prepends 254 country code.
 * Final format: 254XXXXXXX (10 digits total)
 * 
 * @example
 * Valid: "7123456" → "2547123456"
 * Invalid: "12345" → too short
 * Invalid: "712345678" → too long
 */
export function kenyaPhoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const rawValue = control.value as string;

  if (!rawValue) {
    return null; // Required validator handles empty values
  }

  // Remove all non-digit characters
  const digitsOnly = rawValue.replace(/\D/g, '');
  
  // Prepend Kenya country code
  const fullNumber = `254${digitsOnly}`;

  // Validate: exactly 10 digits total (254 + 7)
  if (!/^254\d{7}$/.test(fullNumber)) {
    return { invalidPhone: true };
  }

  return null;
}