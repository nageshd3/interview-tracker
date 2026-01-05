import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const requiredTrimmedValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.value) {
        return { required: true };
    }

    const trimmed = control.value.trim();
    return trimmed.length > 0 ? null : { required: true };
};