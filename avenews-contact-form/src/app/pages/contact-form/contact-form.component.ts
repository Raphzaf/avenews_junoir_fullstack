import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';
import { RecaptchaMockComponent } from '../../components/recaptcha-mock/recaptcha-mock.component';
import { ContactHeaderComponent } from '../../components/contact-header/contact-header.component';
import { TermsSectionComponent } from '../../components/terms-section/terms-section.component';
import { SubmitSectionComponent } from '../../components/submit-section/submit-section.component';
import { FormService, ContactFormData } from '../../services/form.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    PhoneInputComponent,
    RecaptchaMockComponent,
    ContactHeaderComponent,
    TermsSectionComponent,
    SubmitSectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) {
    this.contactForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, ContactFormComponent.kenyaPhoneValidator],
        ],
        verifyPhone: [
          '',
          [Validators.required, ContactFormComponent.kenyaPhoneValidator],
        ],
        secondPhone: ['', [ContactFormComponent.kenyaPhoneValidator]],
        nationalId: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue],
        captchaChecked: [false, Validators.requiredTrue],
      },
      {
        validators: ContactFormComponent.phoneMatchValidator,
      },
    );
  }

  /** Phone must be 10 digits total and include country code 254. */
  static kenyaPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value as string;

    if (!rawValue) return null;

    const digitsOnly = rawValue.replace(/\D/g, '');
    const fullNumber = `254${digitsOnly}`;

    if (!/^254\d{7}$/.test(fullNumber)) {
      return { invalidPhone: true };
    }

    return null;
  }

  /** Cross-field validator: verifyPhone must match phoneNumber */
  static phoneMatchValidator(group: AbstractControl): ValidationErrors | null {
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
        Object.keys(remainingErrors).length ? remainingErrors : null,
      );
    }

    return null;
  }

  get showGlobalError(): boolean {
    return this.submitted && this.contactForm.invalid;
  }

  /** Helper to get typed FormControl for child components */
  getControl(name: string): FormControl {
    return this.contactForm.get(name) as FormControl;
  }

  onSubmit(): void {
    this.submitted = true;
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid) {
      const data: ContactFormData = {
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        email: this.contactForm.value.email,
        phoneNumber: this.contactForm.value.phoneNumber,
        verifyPhone: this.contactForm.value.verifyPhone,
        secondPhone: this.contactForm.value.secondPhone || '',
        nationalId: this.contactForm.value.nationalId,
        termsAccepted: this.contactForm.value.termsAccepted,
      };

      const result = this.formService.submitContactForm(data);
      if (result.success) {
        alert(result.message);
      }
    }
  }
}
