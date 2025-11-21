import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  ngOnInit() {
    // Verificar se há credenciais salvas
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.loginForm.patchValue({
        email: savedEmail,
        rememberMe: true,
      });
    }
  }

  showEmailError(): boolean {
    const emailControl = this.loginForm.get('email');
    return (
      emailControl!.invalid && (emailControl!.dirty || emailControl!.touched)
    );
  }

  showPasswordError(): boolean {
    const passwordControl = this.loginForm.get('password');
    return (
      passwordControl!.invalid &&
      (passwordControl!.dirty || passwordControl!.touched)
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simular processo de login
      setTimeout(() => {
        const formValue = this.loginForm.value;

        // Salvar email se "Lembrar de mim" estiver marcado
        if (formValue.rememberMe) {
          localStorage.setItem('rememberedEmail', formValue.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Simular autenticação bem-sucedida
        console.log('Login realizado:', formValue);

        // Redirecionar para dashboard
        this.router.navigate(['/dashboard']);

        this.isLoading = false;
      }, 2000);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithGoogle() {
    this.isLoading = true;
    console.log('Iniciando login com Google...');

    setTimeout(() => {
      // Simular login social
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 1500);
  }

  loginWithLinkedIn() {
    this.isLoading = true;
    console.log('Iniciando login com LinkedIn...');

    setTimeout(() => {
      // Simular login social
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 1500);
  }

  loginAsDemo() {
    this.isLoading = true;
    console.log('Acessando conta demo...');

    // Preencher com dados demo
    this.loginForm.patchValue({
      email: 'demo@jobscout.com',
      password: 'demopass123',
    });

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 1000);
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    console.log('Redirecionando para recuperação de senha...');
    // this.router.navigate(['/forgot-password']);

    // Simular modal de recuperação
    alert('Funcionalidade de recuperação de senha em desenvolvimento!');
  }
}
