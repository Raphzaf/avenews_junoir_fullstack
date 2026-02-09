import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
})
export class PhoneInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) fieldNumber!: number;
  @Input() placeholder = 'Enter number';
  @Input() required = true;
  @Input() submitted = false;
  @Input() hint = '';

  readonly countryCode = '+254';

  get showError(): boolean {
    return this.submitted && this.control.invalid;
  }

  get errorMessage(): string {
  if (!this.control.errors) return '';
  if (this.control.errors['required']) return 'This field is required.';
  if (this.control.errors['invalidPhone']) {
    return 'Please enter exactly 7 digits (254 prefix added automatically).';
  }
  if (this.control.errors['phoneMismatch']) return 'Phone numbers do not match.';
  return 'Invalid phone number.';
  }
}