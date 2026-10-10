import { loginUser, registerUser, signOutUser } from '../services/authService.js';
import { dataService } from '../services/dataService.js';

export function initAuthPage() {
  const signUpForm = document.querySelector('[data-signup-form]');
  const signInForm = document.querySelector('[data-signin-form]');
  const signOutButton = document.querySelector('[data-signout-button]');

  signUpForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(signUpForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');
    const status = signUpForm.querySelector('[data-form-status]');

    try {
      const user = await registerUser({ name, email, password });
      const previousAnonymousId = dataService.getAnonymousId();
      const linked = window.confirm('Do you want to link earlier anonymous quiz attempts to your new account?');
      if (linked && previousAnonymousId) {
        const attempts = dataService.getQuizAttempts();
        attempts.forEach((attempt) => {
          if (attempt.userId === previousAnonymousId) {
            attempt.userId = user.id;
          }
        });
        dataService.saveQuizAttempts(attempts);
      }
      status.textContent = 'Sign-up successful. You can now sign in.';
      status.className = 'success-message';
      signUpForm.reset();
    } catch (error) {
      status.textContent = error.message;
      status.className = 'error-message';
    }
  });

  signInForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(signInForm);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');
    const status = signInForm.querySelector('[data-form-status]');

    try {
      await loginUser({ email, password });
      status.textContent = 'Signed in successfully.';
      status.className = 'success-message';
      window.location.href = '../index.html';
    } catch (error) {
      status.textContent = error.message;
      status.className = 'error-message';
    }
  });

  signOutButton?.addEventListener('click', () => {
    signOutUser();
    window.location.href = '../index.html';
  });
}
