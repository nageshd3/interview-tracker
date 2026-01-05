import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.value) {
        return null; // Allow empty, let required validator handle it
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value.trim()) ? null : { invalidEmail: true };
};