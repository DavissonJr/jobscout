import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('skillInput') skillInput!: ElementRef;

  currentStep = 1;
  showPassword = false;
  isLoading = false;

  basicInfoForm: FormGroup;
  professionalForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.basicInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['candidate', Validators.required],
    });

    this.professionalForm = this.fb.group({
      title: [''],
      company: [''],
      seniority: [''],
      skills: [[]],
    });

    this.passwordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]],
        newsletter: [true],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  // Navigation
  nextStep() {
    if (this.currentStep === 1 && this.basicInfoForm.valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.professionalForm.valid) {
      this.currentStep = 3;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Form Validation Helpers
  showFieldError(fieldName: string): boolean {
    let form: FormGroup;

    switch (this.currentStep) {
      case 1:
        form = this.basicInfoForm;
        break;
      case 2:
        form = this.professionalForm;
        break;
      case 3:
        form = this.passwordForm;
        break;
      default:
        return false;
    }

    const control = form.get(fieldName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getEmailError(): string {
    const emailControl = this.basicInfoForm.get('email');
    if (emailControl?.errors?.['required']) {
      return 'E-mail é obrigatório';
    }
    if (emailControl?.errors?.['email']) {
      return 'Por favor, insira um e-mail válido';
    }
    return 'E-mail inválido';
  }

  getPasswordError(): string {
    const passwordControl = this.passwordForm.get('password');
    if (passwordControl?.errors?.['required']) {
      return 'Senha é obrigatória';
    }
    if (passwordControl?.errors?.['minlength']) {
      return 'Senha deve ter pelo menos 8 caracteres';
    }
    if (passwordControl?.errors?.['passwordStrength']) {
      return 'Senha não atende aos requisitos de segurança';
    }
    return 'Senha inválida';
  }

  getConfirmPasswordError(): string {
    const confirmControl = this.passwordForm.get('confirmPassword');
    if (confirmControl?.errors?.['required']) {
      return 'Confirmação de senha é obrigatória';
    }
    if (this.passwordForm.errors?.['passwordMismatch']) {
      return 'As senhas não coincidem';
    }
    return 'Confirmação inválida';
  }

  // Password Strength
  getPasswordStrength(): string {
    const password = this.passwordForm.get('password')?.value || '';
    if (password.length === 0) return 'weak';

    const hasMin = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [hasMin, hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    if (score <= 4) return 'strong';
    return 'very-strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    const texts = {
      weak: 'Fraca',
      medium: 'Média',
      strong: 'Forte',
      'very-strong': 'Muito Forte',
    };
    return texts[strength as keyof typeof texts];
  }

  // Password Requirements
  hasMinLength(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return password.length >= 8;
  }

  hasUpperCase(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[0-9]/.test(password);
  }

  hasSpecialChar(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  // Skills Management
  addSkill(input: HTMLInputElement) {
    const skill = input.value.trim();
    if (skill) {
      const currentSkills = this.professionalForm.get('skills')?.value || [];
      if (!currentSkills.includes(skill)) {
        this.professionalForm.patchValue({
          skills: [...currentSkills, skill],
        });
        input.value = '';
      }
    }
  }

  removeSkill(skill: string) {
    const currentSkills = this.professionalForm.get('skills')?.value || [];
    this.professionalForm.patchValue({
      skills: currentSkills.filter((s: string) => s !== skill),
    });
  }

  // Password Toggle
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Custom Validators
  passwordValidator(control: AbstractControl) {
    const password = control.value;
    if (!password) return null;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return { passwordStrength: true };
    }

    return null;
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Form Submission
  onSubmit() {
    if (this.passwordForm.valid) {
      this.isLoading = true;

      // Simular criação de conta
      setTimeout(() => {
        const userData = {
          ...this.basicInfoForm.value,
          ...this.professionalForm.value,
          ...this.passwordForm.value,
        };

        console.log('Conta criada:', userData);

        // Redirecionar para dashboard
        this.router.navigate(['/dashboard']);

        this.isLoading = false;
      }, 2000);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
