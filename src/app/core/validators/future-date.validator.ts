import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const futureDateValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.value) {
        return null; // required validator handles empty case
    }

    const selectedDate = new Date(control.value);
    const today = new Date();

    // Normalize to ignore time part
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate < today
        ? { pastDate: true }
        : null;
}
