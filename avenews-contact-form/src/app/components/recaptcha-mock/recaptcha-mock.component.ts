import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-recaptcha-mock',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './recaptcha-mock.component.html',
  styleUrl: './recaptcha-mock.component.scss',
})
export class RecaptchaMockComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() submitted = false;

  get showError(): boolean {
    return this.submitted && this.control.invalid;
  }

  toggle(): void {
    this.control.setValue(!this.control.value);
    this.control.markAsTouched();
  }
}
