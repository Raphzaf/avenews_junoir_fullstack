# Avenews - Contact Information Form

Application Angular de formulaire de contact pour le processus d'onboarding Avenews. Projet strictement frontend sans backend.

## Stack technique

| Technologie | Version | Usage |
|---|---|---|
| Angular | 21 | Framework principal (standalone components) |
| TypeScript | 5.8+ | Logique applicative |
| SCSS | - | Styling avec variables et mixins |
| Reactive Forms | - | Validation de formulaire |
| Iconify | 1.0.7 | Icones via web components |

## Lancement

```bash
# Installer les dependances
npm install

# Lancer le serveur de dev
ng serve

# Ouvrir dans le navigateur
# http://localhost:4200
```

### Build production

```bash
ng build
```

Les fichiers de production sont generes dans `dist/avenews-contact-form/`.

## Architecture du projet

```
src/
  app/
    components/           # Composants reutilisables
      header/             # Barre de navigation avec logo
      footer/             # Pied de page (contacts, copyright)
      form-input/         # Input generique (texte, email, password)
      phone-input/        # Input telephone avec prefixe +254
      recaptcha-mock/     # Mockup visuel reCAPTCHA
    pages/
      contact-form/       # Page principale du formulaire
    services/
      form.service.ts     # Service de soumission (donnees mockees)
  styles/
    _variables.scss       # Palette de couleurs, typographie, breakpoints
    _mixins.scss          # Mixins responsive et styles reutilisables
  styles.scss             # Styles globaux et reset CSS
```

## Choix d'architecture

### Standalone Components
Angular 17+ recommande les standalone components. Chaque composant declare ses propres imports, ce qui rend le code explicite et facilite le tree-shaking.

### Composants reutilisables avec @Input()
`FormInputComponent` et `PhoneInputComponent` recoivent le `FormControl` en `@Input()` depuis le parent. Cela permet de reutiliser ces composants pour differents champs tout en gardant la logique de validation centralisee dans `ContactFormComponent`.

### Reactive Forms
Le formulaire utilise `FormBuilder` avec validation synchrone. Un validateur cross-field (`phoneMatchValidator`) verifie que le numero de telephone de verification correspond au numero principal.

### SCSS avec BEM
Chaque composant utilise la convention BEM (Block Element Modifier) pour nommer les classes CSS. Les variables et mixins sont partages via `stylePreprocessorOptions` dans `angular.json`.

### Syntaxe @if / @for (Angular 17+)
Utilisation du control flow natif Angular (`@if`, `@for`) au lieu de `*ngIf` / `*ngFor`, comme recommande depuis Angular 17. `[ngClass]` est conserve pour l'application dynamique de classes.

### Service de separation de logique
`FormService` isole la logique de soumission du composant. Meme avec des donnees mockees, cette separation montre une architecture propre et testable.

## Validation

| Champ | Regles |
|---|---|
| First Name | Requis |
| Last Name | Requis |
| Email | Requis + format email valide |
| Phone Number | Requis + exactement 7 chiffres (254 + 7 = 10 digits) |
| Verify Phone | Requis + doit correspondre au Phone Number |
| Second Phone | Optionnel |
| National ID | Requis |
| Terms & Conditions | Doit etre coche |
| reCAPTCHA | Doit etre coche |

Les erreurs s'affichent uniquement apres clic sur "Save and continue".

## Responsive Design

| Breakpoint | Largeur | Comportement |
|---|---|---|
| Mobile | < 768px | Plein ecran, pas de shadow/radius |
| Tablet | 768px - 1024px | Carte 480px centree |
| Desktop | > 1024px | Carte 520px centree |

## Ameliorations possibles avec plus de temps

- **Tests unitaires** : Ajouter des tests Vitest/Jest pour chaque composant et le service
- **Animations** : Ajouter des transitions pour l'apparition des erreurs (`@angular/animations`)
- **Accessibilite avancee** : Audit WCAG complet, gestion du focus au submit, live regions ARIA
- **Internationalisation** : Support multilingue avec `@angular/localize` ou `ngx-translate`
- **Formulaire multi-etapes** : Implementer un stepper si le formulaire grandit
- **Vraie integration reCAPTCHA** : Remplacer le mock par Google reCAPTCHA v3
- **State management** : Sauvegarder l'etat du formulaire en localStorage pour ne pas perdre les donnees

## Commits recommandes

```
feat: scaffold Angular project with SCSS
feat: add Header and Footer components
feat: create reusable FormInput and PhoneInput components
feat: implement contact form with Reactive Forms validation
feat: add reCAPTCHA mock component
feat: add responsive design for mobile/tablet/desktop
docs: add README with architecture and instructions
```
