import { Injectable } from '@angular/core';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  verifyPhone: string;
  secondPhone: string;
  nationalId: string;
  termsAccepted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  /**
   * Simulates form submission.
   * In a real application, this would send data to an API.
   */
  submitContactForm(data: ContactFormData): { success: boolean; message: string } {
    const fullPhone = `254${data.phoneNumber}`;
    const fullVerifyPhone = `254${data.verifyPhone}`;

    console.log('Form submitted with data:', {
      ...data,
      phoneNumber: fullPhone,
      verifyPhone: fullVerifyPhone,
      secondPhone: data.secondPhone ? `254${data.secondPhone}` : '',
    });

    return {
      success: true,
      message: 'Contact information saved successfully.',
    };
  }
}
