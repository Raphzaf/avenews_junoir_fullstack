import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';
import { RecaptchaMockComponent } from '../../components/recaptcha-mock/recaptcha-mock.component';
import { TermsSectionComponent } from '../../components/terms-section/terms-section.component';
import { SubmitSectionComponent } from '../../components/submit-section/submit-section.component';
import { FormService, ContactFormData } from '../../services/form.service';
import { kenyaPhoneValidator } from '../../validators/kenya-phone.validator';
import { phoneMatchValidator } from '../../validators/phone-match.validator';
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    PhoneInputComponent,
    RecaptchaMockComponent,
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
        email: ['', [Validators.required, emailValidator]],
        phoneNumber: ['', [Validators.required, kenyaPhoneValidator]],
        verifyPhone: ['', [Validators.required, kenyaPhoneValidator]],
        secondPhone: ['', [kenyaPhoneValidator]],
        nationalId: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue],
        captchaChecked: [false, Validators.requiredTrue],
      },
      {
        validators: phoneMatchValidator,
      },
    );
  }

  get showGlobalError(): boolean {
    return this.submitted && this.contactForm.invalid;
  }

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