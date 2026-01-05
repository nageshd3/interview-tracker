import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const minLengthTrimmedValidator = (minLength: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // Allow empty, let required validator handle it
        }

        const trimmed = control.value.trim();
        return trimmed.length >= minLength
            ? null
            : { minLengthTrimmed: { requiredLength: minLength, actualLength: trimmed.length } };
    };
};