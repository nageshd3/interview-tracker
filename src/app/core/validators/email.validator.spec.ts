import { FormControl } from '@angular/forms';
import { emailValidator } from './email.validator';

describe('emailValidator', () => {
  it('should return null for empty value', () => {
    const control = new FormControl('');
    expect(emailValidator(control)).toBeNull();
  });

  it('should return null for null value', () => {
    const control = new FormControl(null);
    expect(emailValidator(control)).toBeNull();
  });

  it('should return null for valid email', () => {
    const control = new FormControl('test@example.com');
    expect(emailValidator(control)).toBeNull();
  });

  it('should return error for invalid email', () => {
    const control = new FormControl('invalid-email');
    expect(emailValidator(control)).toEqual({ invalidEmail: true });
  });

  it('should return error for email without domain', () => {
    const control = new FormControl('test@');
    expect(emailValidator(control)).toEqual({ invalidEmail: true });
  });

  it('should trim whitespace and validate', () => {
    const control = new FormControl('  test@example.com  ');
    expect(emailValidator(control)).toBeNull();
  });
});
