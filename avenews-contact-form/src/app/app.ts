import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactHeaderComponent } from './components/contact-header/contact-header.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ContactHeaderComponent, ContactFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
