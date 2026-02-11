import { FormControl } from '@angular/forms';
import { kenyaPhoneValidator } from './kenya-phone.validator';

describe('kenyaPhoneValidator', () => {
  it('should accept 7 digits (valid Kenyan number)', () => {
    const control = new FormControl('7123456');
    expect(kenyaPhoneValidator(control)).toBeNull();
  });

  it('should reject fewer than 7 digits', () => {
    const control = new FormControl('12345');
    expect(kenyaPhoneValidator(control)).toEqual({ invalidPhone: true });
  });

  it('should reject more than 7 digits', () => {
    const control = new FormControl('712345678');
    expect(kenyaPhoneValidator(control)).toEqual({ invalidPhone: true });
  });

  it('should allow empty value (required handles that)', () => {
    const control = new FormControl('');
    expect(kenyaPhoneValidator(control)).toBeNull();
  });

  it('should strip non-digit characters before validating', () => {
    const control = new FormControl('712-3456');
    expect(kenyaPhoneValidator(control)).toBeNull();
  });
});
